package com.oppas.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PolicyChat {

    private String type;
    private String sender;
    private String roomId;// 프론트 테스트를 위해서 변환시켜 놓음 , 컨트롤러에 getRoomId랑 RedisSubscriber의 getRoomId랑 원상복구 필요
    private String message;



    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Message 객체를 JSON 문자열로 변환하는 메서드

    @Override
    public String toString() {
        return "PolicyChat{" +
                "type='" + type + '\'' +
                ", sender='" + sender + '\'' +
                ", roomId='" + roomId + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
