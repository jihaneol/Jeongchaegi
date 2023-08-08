package com.oppas.config.chat;

import com.oppas.dto.policyChat.PolicyChatSaveDto;
import com.oppas.pubsub.RedisSubscriber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@Configuration
public class RedisConfig {

    public static final String CHAT_TOPIC = "ChatTopic";

    @Value("${spring.redis.host}")
    private String redisHostName;
    @Value("${spring.redis.port}")
    private int redisPort;

    @Bean
    public ChannelTopic channelTopic(){
        return new ChannelTopic(CHAT_TOPIC);
    }

    //레디스 연결
    @Bean
    public RedisConnectionFactory lettuceConnectionFactory() {
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisHostName, redisPort);
        return lettuceConnectionFactory;
    }
    /**
     * redis pub/sub 메시지를 처리하는 listener 설정
     */


//  리스너 컨테이너에 실을 리스너로 
//  redisSubscriber클래스와 해당 클래스 내의 메서드를 넣어줌으로서 메시지 전송 메서드를 실행시킴
//    주석된 부분들을 실행시키기 위해서는 없어도 됨
    @Bean
    public MessageListenerAdapter listenerAdapter(RedisSubscriber redisSubscriber){

        return new MessageListenerAdapter(redisSubscriber,"sendMessage");
    }
//      기존의 리스너컨테이너
//    @Bean
//    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory) {
//        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
//        container.setConnectionFactory(connectionFactory);
//        return container;
//    }
//  바뀐 리스너 컨테이너
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter listenerAdapter,
            ChannelTopic channelTopic) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();

        container.setConnectionFactory(connectionFactory);// 레디스 연결 추가
        container.addMessageListener(listenerAdapter,channelTopic);//설정한 리스너를 추가해서 발행된 메시지를 수신자에게 전달하는 메서드 추가

        return container;
    }


    //아래의 메소드를 추가하지 않으면 오류가 발생
    //그 이유는 publisher클래스에서 private final RedisTemplate<String, Object> redisTemplate;
    //을 통해서 의존성을 주입받는데 아래의 것이 없으면 인식하지 못하고 bean생성이 안됨
    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
        return  redisTemplate;
    }

    /**
     * 어플리케이션에서 사용할 redisTemplate 설정
     */
//    기존의 RedisTemplate
//    @Bean
//    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
//        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
//        redisTemplate.setConnectionFactory(connectionFactory);
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
//        return redisTemplate;
//    }
//  변경된 RedisTemplate
//  Redis와 상호작용하기 위한 RedisTemplate 빈, Redis와의 통신을 단순화
//  즉 redis서버에 redis 커맨드를 수행할 수 있도록 도와줌
//  opsForValue() : Redis의 String타입을 Serialize / Deserialize 해주는 인터페이스
//  opsForList() : Redis의 List타입을 Serialize / Deserialize 해주는 인터페이스
//  opsForSet() : Redis의 Set타입을 Serialize / Deserialize 해주는 인터페이스
//  opsForZset() : Redis의 Zset타입을 Serialize / Deserialize 해주는 인터페이스
//  opsForHash() : Redis의 Hash타입을 Serialize / Deserialize 해주는 인터페이스

//opsForValue() : Redis에서 문자열 값을 다루기 위한 ValueOperations 객체를 반환하며, 문자열 값을 설정하거나 가져오는 등의 연산을 수행할 수 있습니다.
//opsForList() : Redis에서 리스트 값을 다루기 위한 ListOperations 객체를 반환하며, 리스트에 값을 추가하거나 가져오는 등의 연산을 수행할 수 있습니다.
//opsForSet() : Redis에서 집합 값을 다루기 위한 SetOperations 객체를 반환하며, 집합에 값을 추가하거나 가져오는 등의 연산을 수행할 수 있습니다.
//opsForHash() : Redis에서 해시 값을 다루기 위한 HashOperations 객체를 반환하며, 해시에 필드와 값을 추가하거나 가져오는 등의 연산을 수행할 수 있습니다.
//opsForZSet() : Redis에서 정렬된 집합 값을 다루기 위한 ZSetOperations 객체를 반환하며, 정렬된 집합에 값을 추가하거나 가져오는 등의 연산을 수행할 수 있습니다.

//    이를 통해 반환된 객체를 통해 추가적인 메소드를 통한 연산이 가능하다.
//    해당 프로젝트에서는 ZSetOperations 인스턴스를 생성해서 이를 통해 키,밸류,가중치를 저장하는 식으로 사용
    @Bean
    public RedisTemplate<String , PolicyChatSaveDto> chatRedisTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<String , PolicyChatSaveDto> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);
        //아래 2줄은 키와 밸류를 redis에 저장하기 위해서 직렬화함
        //직렬화는 데이터전송 시 기본값이 아닌 객체의 경우 그 값들이 그대로 전송되지 않고 주소값이 되므로 직렬화를 통해서 값들을 그대로 전달
        //Redis 데이터베이스는 String으로 구성, key와 value의 타입을 모두 String으로 지정필요.
        // 만약 다른 데이터 타입을 사용하려면, 그에 맞는 Serializer를 지정해.
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(PolicyChatSaveDto.class));
        //redis
        return redisTemplate;
    }

    //redis를 통한 캐시메모리 사용
    //이를 통해서 반복적인 db접근을 막을 수 있음
    @Bean
    public CacheManager redisCacheManager(RedisConnectionFactory connectionFactory){
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()))
                .entryTtl(Duration.ofMinutes(10));


        RedisCacheManager redisCacheManager = RedisCacheManager.RedisCacheManagerBuilder
                .fromConnectionFactory(connectionFactory)
                .cacheDefaults(redisCacheConfiguration)
                .build();

        return redisCacheManager;
    }

}