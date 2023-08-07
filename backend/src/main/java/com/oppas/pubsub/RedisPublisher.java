package com.oppas.pubsub;

import com.oppas.dto.PolicyChatSaveDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;


    //pub와 sub두 클래스에 모두 convertAndSend메서드가 있는 이유는
    //pub에서는 채팅 메시지를 convertAndSend 를 통해서 직렬화하고 Redis 채널에 발행
    //sub에서는 Redis의 채널 구독 기능을 통해 Redis 로부터 메시지를 받아와 WebSocket으로 전달
    //받은 메시지는 직렬화되어 있는 상태이기 때문에, 객체로 변환해야 원하는 데이터를 가져옴
    public void publish(ChannelTopic topic, PolicyChatSaveDto policyChatSaveDto) {
        redisTemplate.convertAndSend(topic.getTopic(), policyChatSaveDto);
    }
}