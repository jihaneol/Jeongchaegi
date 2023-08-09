package com.oppas.scheduler;


import com.oppas.dto.policyChat.PolicyChatSaveDto;
import com.oppas.entity.Member;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyChat;
import com.oppas.repository.ChatJdbcRepository;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.policy.PolicyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class PolicyChatWriteToMySqlScheduler {

    private final RedisTemplate<String,Object> redisTemplate;
    private final RedisTemplate<String, PolicyChatSaveDto> chatRedisTemplate;
    private final PolicyRepository policyRepository;
    private final MemberRepository memberRepository;
    private final ChatJdbcRepository chatJdbcRepository;


//  CRON 표현식에서 "일"과 "요일" 중 하나만 값을 지정할 수 있슴. 물음표(?)는 그 중에서 값이 지정되지 않은 필드를 나타내기 위함.
    @Scheduled(cron = "0 0 * * * ?")//1시간마다
    @Transactional
    public void writeBack(){
        log.info("Scheduling start");
        //여기서부터 읽어오는 과정.
        BoundZSetOperations<String, PolicyChatSaveDto> setOperations = chatRedisTemplate.boundZSetOps("NEW_POLICY_CHAT");

        ScanOptions scanOptions = ScanOptions.scanOptions().build();

        List<PolicyChat> chatList = new ArrayList<>();
        try(Cursor<ZSetOperations.TypedTuple<PolicyChatSaveDto>> cursor= setOperations.scan(scanOptions)){
            //ZSetOperations.TypedTuple<V>는 Redis에서 Sorted Set(ZSet)의 항목을 나타내는 인터페이스입니다.
            // 여기서 <V>는 값(value)의 타입을 나타냅니다. TypedTuple은 값과 그에 해당하는 점수(score)를 포함하고 있습니다
            // getValue(): ZSet의 항목값을 반환합니다.
            //getScore(): 해당 항목의 점수를 반환합니다..
            while(cursor.hasNext()){
                ZSetOperations.TypedTuple<PolicyChatSaveDto> policyChatDto =cursor.next();


                Policy policy = policyRepository.findById(policyChatDto.getValue().getPolicyId()).orElseThrow(null);
                Member member = memberRepository.findById(policyChatDto.getValue().getMemberId()).orElseThrow(null);
//
                if(policy==null||member==null) {
                    continue;
                }
//
                chatList.add( PolicyChat.of(policyChatDto.getValue(),member,policy));
            }
            chatJdbcRepository.batchInsertRoomInventories(chatList);

            redisTemplate.delete("NEW_POLICY_CHAT");

        }catch (Exception e){
            e.printStackTrace();
        }

        log.info("Scheduling done");
    }
}
