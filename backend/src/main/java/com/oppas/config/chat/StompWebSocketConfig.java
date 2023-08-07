package com.oppas.config.chat;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("api/policychat").setAllowedOrigins("http://localhost:8080","http://localhost:8088","http://3.36.131.236:443","http://3.36.131.236:80","https://3.36.131.236:443","https://3.36.131.236:80").withSockJS();
    }

    
    //기존 webSocketConfig => StompWebSocketConfig 으로 바꾸면서 추가된 메서드
    //stomp는 메시징 프로토콜,  클라이언트와 서버 간의 실시간 메시징을 지원, 메시지를 발행(Publish)하고 구독(Subscribe)하는 기능을 제공
    //redis를 사용하는 이유는 분산 메모리 데이터베이스로 은 클라이언트와 연결되고 실시간 메시지를 처리,멀티 서버 환경, 메시지 보존
    //Redis는 기본적으로 STOMP 프로토콜을 직접 지원하지 않음,
    //하지만 Redis를 메시지 브로커로 사용하여 STOMP를 구현하는 것은 가능
    //함께 사용함으로서  Redis를 메시지 브로커로 사용하여 실시간 채팅을 처리하면서, 웹 애플리케이션과 클라이언트들과의 통신은 STOMP 프로토콜을 활용하여 간편하게 처리
    //

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }
}
