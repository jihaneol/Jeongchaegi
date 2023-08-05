package com.oppas.pubsub;

import com.oppas.dto.PolicyChat;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, PolicyChat policyChat) {
        redisTemplate.convertAndSend(topic.getTopic(), policyChat);
    }
}