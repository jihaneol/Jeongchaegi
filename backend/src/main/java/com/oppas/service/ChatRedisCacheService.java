package com.oppas.service;



import com.oppas.Util.ChatUtil;
import com.oppas.dto.PolicyChatPagingDto;
import com.oppas.dto.PolicyChatPagingResponseDto;
import com.oppas.dto.PolicyChatSaveDto;
import com.oppas.entity.policy.PolicyChat;
import com.oppas.repository.policy.PolicyChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;




@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRedisCacheService {

    private final ChatUtil chatUtil;

    public static final String NEW_CHAT = "NEW_CHAT";
    public static final String OUT_USER = "탈퇴한 회원";
    public static final String USERNAME_NICKNAME = "USERNAME_NICKNAME";
    private final RedisTemplate<String, Object> redisTemplate;

    private final PolicyChatRepository policyChatRepository;
//

//    private final UserRepository userRepository;
    private final RedisTemplate<String, PolicyChatSaveDto> chatRedisTemplate;

    private final RedisTemplate<String, String> roomRedisTemplate;

    private ZSetOperations<String, PolicyChatSaveDto> zSetOperations;

    @PostConstruct
    private void init() {
        zSetOperations = chatRedisTemplate.opsForZSet();
    }
    //ZSetOperations는 Redis에서 제공하는 데이터 구조 중 하나인 Sorted Set(정렬된 집합)을 다루기 위한 인터페이스
    //중복된 값은 허용되지 않음.
    //값과 함께 해당 값의 순위(또는 점수)를 가지고 있어 값의 정렬이나 순위 기반의 연산을 지원.

    //opsForZSet은 RedisTemplate의 인스턴스를 사용하여 Sorted Set (정렬된 집합) 데이터 유형을 다루는데 사용되는 메서드를 반환합니다
    //redis chat data 삽입
    public void addChat(PolicyChatSaveDto policyChatSaveDto) {

        PolicyChatSaveDto savedData = PolicyChatSaveDto.createChatMessageSaveDto(policyChatSaveDto);

        double localDateTimeToDoubleVal = chatUtil.changeLocalDateTimeToDouble(savedData.getCreatedAt());


        redisTemplate.opsForZSet().add(NEW_CHAT, savedData, localDateTimeToDoubleVal);
        //위의 것은 redis에서 한번에 최근의 채팅을 조회하여 sql에 적어야 하는데 정책마다 따로 키값이 있으면 하나하나 찾기 어려우므로
        redisTemplate.opsForZSet().add("CHAT_SORTED_SET_" + savedData.getPolicyId(), savedData, localDateTimeToDoubleVal);
    }

    //chat_data 조회
    public ResponseEntity<List<PolicyChatPagingResponseDto>> getChatsFromRedis(Long policyId, PolicyChatPagingDto policyChatPagingDto) {

        //마지막 채팅을 기준으로 redis의 Sorted set에 몇번째 항목인지 파악
        PolicyChatSaveDto cursorDto = PolicyChatSaveDto.builder()
                .policyId(policyId)
                .createdAt(policyChatPagingDto.getCursor())
                .message(policyChatPagingDto.getMessage())
                .memberId(policyChatPagingDto.getMemberId())
                .nickName(policyChatPagingDto.getNickName())
                .build();

        System.out.println(cursorDto.toString());
        //마지막 chat_data cursor Rank 조회
        Long rank = zSetOperations.reverseRank("CHAT_SORTED_SET_" + policyId, cursorDto);
        System.out.println("rank : "+ rank);
        //Cursor 없을 경우 -> 최신채팅 조회
        if (rank == null)
            rank = 0L;
        else rank = rank + 1;

        System.out.println("rank : "+ rank);
        //Redis 로부터 chat_data 조회
        Set<PolicyChatSaveDto> policyChatSaveDtoSet = zSetOperations.reverseRange("CHAT_SORTED_SET_" + policyId, rank, rank + 10);
        System.out.println("set의 사이즈는"+policyChatSaveDtoSet.size());



        List<PolicyChatPagingResponseDto> redisChatList =
                policyChatSaveDtoSet
                        .stream()
                        .map(PolicyChatPagingResponseDto::byChatMessageDto)
                        .collect(Collectors.toList());

        //Chat_data 부족할경우 MYSQL 추가 조회
        if (redisChatList.size() != 10) {
            findChatFromMysql(redisChatList, policyId, policyChatPagingDto.getCursor());
        }


        System.out.println("리스트 사이즈는"+redisChatList.size());

        return ResponseEntity.ok(redisChatList);
    }

//    레디스에 채팅 부족할 시 호출할 메서드
    private void findChatFromMysql(List<PolicyChatPagingResponseDto> chatMessageDtoList, Long policyId, String cursor) {
        System.out.println("db로 채팅 찾으러 옴");

        String lastCursor;
        // 데이터가 하나도 없을 경우 현재시간을 Cursor로
        if (chatMessageDtoList.size() == 0 && cursor == null) {
            ;
            lastCursor = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS"));
        }

        //페이지에 노출된 마지막 채팅이 레디스의 마지막 채팅일 경우
        else if (chatMessageDtoList.size() == 0 && cursor != null) {
            lastCursor = cursor;
        }

        // 데이터가 존재할 경우 가장 오래된 채팅의 cursor를 활용
        else lastCursor = chatMessageDtoList.get(chatMessageDtoList.size() - 1).getCreatedAt();

        int redisChatListSize = chatMessageDtoList.size();
        Slice<PolicyChat> policyChatSlice =
                policyChatRepository
                        .findAllByCreatedAtBeforeAndPolicy_IdOrderByCreatedAtDesc(
                                lastCursor,
                                policyId,
                                PageRequest.of(0, 30)
                                //위에서 굳이 30개를 부르는 이유는 채팅 구현시 위로 올리는 행위는 1회에 그치지 않을 가능성이 높음
                                // => 추가적인 데이터를 미리 싣어놓는 것이 더 성능상 이점 예상
                        );

        //추가 데이터가 없을 때 return;
        if (policyChatSlice.getContent().isEmpty())
            return;

//      추가적인 데이터가 존재할 시 레디스에 싣기
        for (PolicyChat policyChat : policyChatSlice.getContent()) {
            cachingChatFromMysqlToRedis(policyChat);
        }



        //추가 데이터가 존재하다면, responseDto에  데이터 추가.
        for (int i = redisChatListSize; i <= 10; i++) {
            try {
                PolicyChat policyChat = policyChatSlice.getContent().get(i - redisChatListSize);
                chatMessageDtoList.add(PolicyChatPagingResponseDto.policyChatEntityToPagingResponseDto(policyChat));
            } catch (IndexOutOfBoundsException e) {
                return;
            }
        }

    }

    
//    각각의 채팅을 레디스에 싣는 메서드
    public void cachingChatFromMysqlToRedis(PolicyChat policyChat) {
//      policyChat 엔티티를 Dto로 만들어서 올리기
        PolicyChatSaveDto policyChatSaveDto = PolicyChatSaveDto.policyChatEntityToSaveDto(policyChat);
        redisTemplate.opsForZSet()
                .add(
                        "CHAT_SORTED_SET_" + policyChatSaveDto.getPolicyId(),
                        policyChatSaveDto,
                        chatUtil.changeLocalDateTimeToDouble(policyChatSaveDto.getCreatedAt()));
    }

}
