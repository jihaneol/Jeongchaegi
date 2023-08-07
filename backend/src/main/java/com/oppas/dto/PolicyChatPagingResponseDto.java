package com.oppas.dto;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Builder
@Setter
@AllArgsConstructor
public class PolicyChatPagingResponseDto {

    private Long policyId;
    private Long memberId;
    private String message;

    private String createdAt;
    private String nickname;

//    public static PolicyChatPagingResponseDto of(PolicyChat policyChat){
//        return PolicyChatPagingResponseDto.builder()
//                .memberId(policyChat.getUsers())
//                .workSpaceId(policyChat.getWorkSpace().getId())
//                .createdAt(policyChat.getCreatedAt())
//                .message(policyChat.getMessage())
//                .build();
//    }

    public static PolicyChatPagingResponseDto byChatMessageDto(PolicyChatSaveDto policyChatSaveDto){
        return PolicyChatPagingResponseDto.builder()
                .memberId(policyChatSaveDto.getMemberId())
                .createdAt(policyChatSaveDto.getCreatedAt())
                .policyId(policyChatSaveDto.getPolicyId())
                .message(policyChatSaveDto.getMessage())
                .nickname(policyChatSaveDto.getNickName())
                .build();
    }
}
