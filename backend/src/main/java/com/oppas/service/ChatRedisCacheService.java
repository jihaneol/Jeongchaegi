package com.oppas.service;


import com.oppas.dto.PolicyChatPagingDto;
import com.oppas.dto.PolicyChatPagingResponseDto;
import com.oppas.dto.PolicyChatSaveDto;
import com.oppas.dto.ResponseDto;
import com.oppas.utill.ChatUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRedisCacheService {

    private final ChatUtil chatUtil;

    public static final String NEW_CHAT = "NEW_CHAT";
    public static final String OUT_USER = "탈퇴한 회원";
    public static final String USERNAME_NICKNAME = "USERNAME_NICKNAME";
    private final RedisTemplate<String, Object> redisTemplate;

//    private final ChatRepository chatRepository;
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

        redisTemplate.opsForZSet().add("CHAT_SORTED_SET_" + savedData.getPolicyId(), savedData, localDateTimeToDoubleVal);
    }

    //chat_data 조회
    public ResponseEntity<Set<PolicyChatSaveDto>> getChatsFromRedis(Long policyId, PolicyChatPagingDto policyChatPagingDto) {

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

        Iterator<PolicyChatSaveDto> iterator = policyChatSaveDtoSet.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }


//        List<PolicyChatPagingResponseDto> chatList =
//                policyChatSaveDtoSet
//                        .stream()
//                        .map(PolicyChatPagingResponseDto::byChatMessageDto)
//                        .collect(Collectors.toList());
//        Iterator<PolicyChatPagingResponseDto> iterator2 = chatList.iterator();
//
//        System.out.println("리스트 사이즈는"+chatList.size());
//        while (iterator2.hasNext()) {
//            System.out.println(iterator.next());
//        }
//        //Chat_data 부족할경우 MYSQL 추가 조회
//        if (chatList.size() != 10) {
//            findOtherChatDataInMysql(chatList, policyId, policyChatPagingDto.getCursor());
//        }

//        //redis caching 닉네임으로 작성자 삽입
//        for (ChatPagingResponseDto chatPagingResponseDto : chatMessageDtoList) {
//            chatPagingResponseDto.setNickname(findUserNicknameByUsername(chatPagingResponseDto.getWriter()));
//        }

        return ResponseEntity.ok(policyChatSaveDtoSet);
    }
//
//    public void cachingDBDataToRedis(Chat chat) {
//        ChatMessageSaveDto chatMessageSaveDto = ChatMessageSaveDto.of(chat);
//        redisTemplate.opsForZSet()
//                .add(
//                        CHAT_SORTED_SET_ + chatMessageSaveDto.getRoomId(),
//                        chatMessageSaveDto,
//                        chatUtils.changeLocalDateTimeToDouble(chatMessageSaveDto.getCreatedAt()));
//    }
//
//    //redis 회원 닉네임 조회
//    public String findUserNicknameByUsername(String username) {
//
//        String nickname = (String) roomRedisTemplate.opsForHash().get(USERNAME_NICKNAME, username);
//
//        if (nickname != null)
//            return nickname;
//
//        //redis 닉네임이 존재하지 않는다면, MYSQL에서 데이터 불러오기
//        User user = userRepository.findByUsername(username)
//                .orElse(null);
//
//        if (user == null) return OUT_USER;
//
//        // redis nickname_data insert
//        roomRedisTemplate.opsForHash().put(USERNAME_NICKNAME, username, user.getNickname());
//
//        return user.getNickname();
//    }
//
//    public void changeUserCachingNickname(String username, String changedNickname) {
//        roomRedisTemplate.opsForHash().put(USERNAME_NICKNAME, username, changedNickname);
//    }
//
//    public void deleteUserCahchingNickname(String username) {
//        roomRedisTemplate.opsForHash().delete(USERNAME_NICKNAME, username);
//    }
//
//    private void findOtherChatDataInMysql(List<ChatPagingResponseDto> chatMessageDtoList, Long workSpaceId, String cursor) {
//
//        String lastCursor;
//        // 데이터가 하나도 없을 경우 현재시간을 Cursor로 활용
//        if (chatMessageDtoList.size() == 0 && cursor == null) {
//            ;
//            lastCursor = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS"));
//        }
//
//        //redis 적재된 마지막 데이터를 입력했을 경우.
//        else if (chatMessageDtoList.size() == 0 && cursor != null) {
//            lastCursor = cursor;
//        }
//
//        // 데이터가 존재할 경우 CreatedAt을 Cursor로 사용
//        else lastCursor = chatMessageDtoList.get(chatMessageDtoList.size() - 1).getCreatedAt();
//
//        int dtoListSize = chatMessageDtoList.size();
//        Slice<Chat> chatSlice =
//                chatRepository
//                        .findAllByCreatedAtBeforeAndWorkSpace_IdOrderByCreatedAtDesc(
//                                lastCursor,
//                                workSpaceId,
//                                PageRequest.of(0, 30)
//                        );
//
//        for (Chat chat : chatSlice.getContent()) {
//            cachingDBDataToRedis(chat);
//        }
//
//
//        //추가 데이터가 없을 때 return;
//        if (chatSlice.getContent().isEmpty())
//            return;
//
//        //추가 데이터가 존재하다면, responseDto에  데이터 추가.
//        for (int i = dtoListSize; i <= 10; i++) {
//            try {
//                Chat chat = chatSlice.getContent().get(i - dtoListSize);
//                chatMessageDtoList.add(ChatPagingResponseDto.of(chat));
//            } catch (IndexOutOfBoundsException e) {
//                return;
//            }
//        }
//
//    }
}
