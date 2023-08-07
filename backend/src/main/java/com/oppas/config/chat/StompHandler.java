//package com.oppas.config.chat;
//
//
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.redis.listener.ChannelTopic;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.stereotype.Component;
//
//import java.util.Optional;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class StompHandler implements ChannelInterceptor {
//
////    private final JwtDecoder jwtDecoder;
////
////    public static final String TOKEN = "token";
////    public static final String SIMP_DESTINATION = "simpDestination";
////    public static final String SIMP_SESSION_ID = "simpSessionId";
////    public static final String INVALID_ROOM_ID = "InvalidRoomId";
////
////    private final HeaderTokenExtractor headerTokenExtractor;
////    private final ChatUtils chatUtils;
////
////    private final ChannelTopic topic;
////
////    private final ChatRoomService chatRoomService;
////
////    private final RedisPublisher redisPublisher;
//
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
////        //StompHeaderAccessor는 STOMP 프로토콜의 헤더를 다루는 데 사용
////        //메시지의 목적지(destination)(url), 구독 ID(subscriptionId), 세션 ID(sessionId) 등의 정보에 접근
////        //StompHeaderAccessor.wrap()은 Message 객체를 StompHeaderAccessor의 인스턴스로 래핑하여 STOMP 프로토콜의 헤더를 다루기 위한 편리한 방법을 제공
////        //StompHeaderAccessor.wrap() 메서드를 사용하면 기존의 Message 객체를 간단하게 StompHeaderAccessor의 인스턴스로 변환
////        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
////
////        // 최초 소켓 연결
////        if (StompCommand.CONNECT == accessor.getCommand()) {
////            String headerToken = accessor.getFirstNativeHeader(TOKEN);
////            //StompHeaderAccessor.getFirstNativeHeader()는 STOMP 메시지의 헤더 중에서 원시 헤더의 첫 번째 값을 얻기 위한 메서드
////            //STOMP 프로토콜은 원시 헤더(raw header)와 STOMP 프로토콜 헤더(STOMP header)로 구성.
////            // 원시 헤더는 WebSocket 연결 시에 브라우저와 서버 간에 주고받는 HTTP 헤더를 말하며,
////            // 이는 STOMP 프로토콜의 외부에서는 보이지 않을 수 있슴.
////            //StompHeaderAccessor.getFirstNativeHeader(String name) 메서드를 사용하면 STOMP 메시지의 원시 헤더 중에서 특정 이름(name)에 해당하는 첫 번째 값을 얻음
////            String token = headerTokenExtractor.extract(headerToken);
////            log.info(jwtDecoder.decodeUsername(token).getUsername());
////
////        }
////        // 소켓 연결 후 ,SUBSCRIBE 등록
////        else */if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
////            log.info("SubScribe destination : " + message.getHeaders().get(SIMP_DESTINATION));
////            log.info("SubScribe sessionId : " + message.getHeaders().get(SIMP_SESSION_ID));
////
////            String headerToken = accessor.getFirstNativeHeader(TOKEN);
////            String token = headerTokenExtractor.extract(headerToken);
////            String username = jwtDecoder.decodeUsername(token).getUsername();
////
////            String destination = Optional.ofNullable(
////                    (String) message.getHeaders().get(SIMP_DESTINATION)
////            ).orElse(INVALID_ROOM_ID);
////
////            String sessionId = Optional.ofNullable(
////                    (String) message.getHeaders().get(SIMP_SESSION_ID)
////            ).orElse(null);
////
////            String roomId = chatUtils.getRoodIdFromDestination(destination);
////
////            //redis에  key(roomId) :  Value( sessionId , nickname ) 저장
////            chatRoomService.enterChatRoom(roomId, sessionId, username);
////
////
////            redisPublisher.publish(topic,
////                    ChatMessageSaveDto.builder()
////                            .type(ChatMessageSaveDto.MessageType.ENTER)
////                            .roomId(roomId)
////                            .userList(chatRoomService.findUser(roomId, sessionId))
////                            .build()
////            );
////
////        }
////
////        //reids SubScribe 해제
////        else if (StompCommand.UNSUBSCRIBE == accessor.getCommand()) {
////
////            String sessionId = Optional.ofNullable(
////                    (String) message.getHeaders().get(SIMP_SESSION_ID)
////            ).orElse(null);
////
////            String roomId = chatRoomService.leaveChatRoom(sessionId);
////
////            redisPublisher.publish(topic,
////                    ChatMessageSaveDto.builder()
////                            .type(ChatMessageSaveDto.MessageType.QUIT)
////                            .roomId(roomId)
////                            .userList(chatRoomService.findUser(roomId, sessionId))
////                            .build()
////            );
////        }
////        //소켓 연결 후 , 소켓 연결 해제 시
////        else if (StompCommand.DISCONNECT == accessor.getCommand()) {
////
////            String sessionId = Optional.ofNullable(
////                    (String) message.getHeaders().get(SIMP_SESSION_ID)
////            ).orElse(null);
////
////            String roomId = chatRoomService.disconnectWebsocket(sessionId);
////
////            redisPublisher.publish(topic,
////                    ChatMessageSaveDto.builder()
////                            .type(ChatMessageSaveDto.MessageType.QUIT)
////                            .roomId(roomId)
////                            .userList(chatRoomService.findUser(roomId, sessionId))
////                            .build()
////            );
////
////        }
//        return message;
//    }
//}
