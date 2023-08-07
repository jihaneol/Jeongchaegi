package com.oppas.controller;

import com.oppas.dto.PolicyChatPagingDto;
import com.oppas.dto.PolicyChatPagingResponseDto;
import com.oppas.dto.PolicyChatSaveDto;
import com.oppas.dto.ResponseDto;
import com.oppas.pubsub.RedisPublisher;
import com.oppas.service.ChatRedisCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

@Controller
@RequiredArgsConstructor
public class PolicyChatController {
//    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final RedisPublisher redisPublisher;
    private final ChannelTopic channelTopic;
    private final ChatRedisCacheService chatRedisCacheService;


    
    //채팅 받았을 시 sub/pub처리 메서드. 즉, 메시지 발행 메서드
    @MessageMapping("policychat")
    public void message(PolicyChatSaveDto policyChatSaveDto){

//        simpMessageSendingOperations.convertAndSend("/sub/policychat/"+ policyChat.getRoomId(), policyChat);
//        레디스 설정파일에 MessageListenerAdapter 즉 sub에서 처리하도록 변경

        System.out.println(LocalDateTime.now());
        policyChatSaveDto.setCreatedAt(LocalDateTime.now());
        System.out.println(policyChatSaveDto);
        //channelTopic을 통해서 서로 다른값을 주면 메시지를 특정대상에게만 주는 등 채널의 분리가 가능해짐
        //예를 들어서 사용자별 등급채팅과 같이...
        //즉 채널토픽과 채팅방아이디 2가지를 통해서 분리가 가능하다는 말
        redisPublisher.publish(channelTopic, policyChatSaveDto);
        chatRedisCacheService.addChat(policyChatSaveDto);

    }


    //채팅방 입장 또는 커서 올릴 시 이전의 채팅내역을 보여주는 메서드
//    @ApiOperation(value = "채팅", notes = "채팅 cursor paging 을 통해 조회하기")
    @PostMapping("/api/chats/{policyId}")
    public ResponseEntity<Set<PolicyChatSaveDto>> getChatting(@PathVariable Long policyId, @RequestBody(required = false) PolicyChatPagingDto policyChatPagingDto){
        System.out.println("여기요~");
        //Cursor 존재하지 않을 경우,현재시간을 기준으로 paging
        if(policyChatPagingDto==null||policyChatPagingDto.getCursor()==null || policyChatPagingDto.getCursor().equals("")){
            policyChatPagingDto= PolicyChatPagingDto.builder()
                    .cursor(LocalDateTime.now())
                    .build();
        }
        return chatRedisCacheService.getChatsFromRedis(policyId,policyChatPagingDto);
    }

}