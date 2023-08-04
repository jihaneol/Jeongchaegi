package com.oppas.controller;

import com.oppas.Utill.chatUtil;
import com.oppas.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class PolicyChatController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("policy")
    public void message(Message message){
        System.out.println(message);
        simpMessageSendingOperations.convertAndSend("/sub/policychat/"+message.getPolicyId(), message);

    }

}
