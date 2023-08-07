package com.oppas.Util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Component
public class ChatUtil {

//    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Message 객체를 JSON 문자열로 변환하는 메서드
    public Double changeLocalDateTimeToDouble(LocalDateTime createdAt) {

        return ((Long)createdAt.toInstant(ZoneOffset.ofHours(9)).toEpochMilli()).doubleValue();


    }
}
