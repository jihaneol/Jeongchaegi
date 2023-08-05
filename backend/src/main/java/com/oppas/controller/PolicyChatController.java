package com.oppas.controller;

import com.oppas.dto.PolicyChat;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class PolicyChatController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("policychat")
    public void message(PolicyChat policyChat){
        System.out.println(policyChat);
        simpMessageSendingOperations.convertAndSend("/sub/policychat/"+ policyChat.getRoomId(), policyChat);

    }

}
