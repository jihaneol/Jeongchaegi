package com.oppas.scheduler;


import com.oppas.Util.ChatUtil;
import com.oppas.dto.policyChat.PolicyChatSaveDto;
import com.oppas.entity.policy.PolicyChat;
import com.oppas.repository.policy.PolicyChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Component
@RequiredArgsConstructor
@Slf4j
public class PolicyChatCacheScheduler {

    private final ChatUtil chatUtil;

    private final PolicyChatRepository policyChatRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private final RedisTemplate<String, PolicyChatSaveDto> chatRedisTemplate;
    private ZSetOperations<String, PolicyChatSaveDto> zSetOperations;

    @Scheduled(cron = "0 0 2 * * *") // 매일 2시마다
    @Transactional
    public void chatCaching() {
        log.info("[Scheduling] redis chat caching start");

        ScanOptions scanOptions = ScanOptions.scanOptions()
                .match("CHAT_SORTED_SET_" + "*")
                .build();

        Cursor<String> cursor=redisTemplate.scan(scanOptions);


        //기존 redis caching 데이터 삭제
        while(cursor.hasNext()){
            String matchedKey = cursor.next();
            log.info(matchedKey);
            redisTemplate.delete(matchedKey);
        }

        //redis caching 데이터 1주일치 , 적재하기
        cachingDataToRedisFromDB();

    }

    public void cachingDataToRedisFromDB(){

        zSetOperations = chatRedisTemplate.opsForZSet();
        //서버 시작전, redis 에 데이터 적재시키기.
        LocalDateTime current = LocalDateTime.now();
        LocalDateTime cursorDate = current.minusDays(7);

        String cursor = cursorDate.format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS"));
        log.info("7일전 날짜 : {}", cursor);

        //7일전 데이터 전부가져와서, redis에 적재
        List<PolicyChat> policyChats = policyChatRepository.findAllByCreatedAtAfterOrderByCreatedAtDesc(cursor);

        for (PolicyChat policyChat : policyChats) {
            PolicyChatSaveDto policyChatSaveDto = PolicyChatSaveDto.policyChatEntityToSaveDto(policyChat);
            zSetOperations.add("CHAT_SORTED_SET_"+policyChat.getPolicy().getId(), policyChatSaveDto, chatUtil.changeLocalDateTimeToDouble(policyChat.getCreatedAt()));
        }
    }

}
