package com.oppas.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oppas.dto.PolicyChatSaveDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber/* implements MessageListener*/ {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
     */
    /*@Override
    public void onMessage(Message message, byte[] pattern) {*/
    public void sendMessage(String publishMessage){
//
        try{
            //redis에서 발행된 데이터를 받아 deserialize
            PolicyChatSaveDto policyChatSaveDto = objectMapper.readValue(publishMessage, PolicyChatSaveDto.class);

            //WebSocket 구독자에게 채팅 메시지 Send
            messagingTemplate.convertAndSend("/sub/policychat"+policyChatSaveDto.getPolicyId(),policyChatSaveDto);
        }catch (Exception e){
            log.error(e.getMessage());
        }

    }
}