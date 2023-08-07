package com.oppas.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PolicyChatSaveDto {

//    정책채팅은 사용자의 입장퇴장 관리가 필요없다.
//    private String type;
    private Long memberId;//
    private Long policyId;// 프론트 테스트를 위해서 변환시켜 놓음 , 컨트롤러에 getRoomId랑 RedisSubscriber의 getRoomId랑 원상복구 필요
    private String message;
    private String nickName;


    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;


    private static final ObjectMapper objectMapper = new ObjectMapper();



    public static PolicyChatSaveDto createChatMessageSaveDto(PolicyChatSaveDto policyChatSaveDto){
        return PolicyChatSaveDto.builder()
//    type관리가 필요 없으므로 그대로 보냄
//              .type(MessageType.TALK)
                .policyId(policyChatSaveDto.getPolicyId())
                .memberId(policyChatSaveDto.getMemberId())
                .createdAt(policyChatSaveDto.getCreatedAt())
                .message(policyChatSaveDto.getMessage())
                .createdAt(policyChatSaveDto.getCreatedAt())
                .nickName(policyChatSaveDto.getNickName())
                .build();
    }


    @Override
    public String toString() {
        return "PolicyChatSaveDto{" +
                "memberId=" + memberId +
                ", policyId=" + policyId +
                ", message='" + message + '\'' +
                ", nickName='" + nickName + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
