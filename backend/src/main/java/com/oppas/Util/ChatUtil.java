package com.oppas.Util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

@Component
public class ChatUtil {

//    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Message 객체를 JSON 문자열로 변환하는 메서드
    public Double changeLocalDateTimeToDouble(String createdAt) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss.SSS");
        LocalDateTime localDateTime = LocalDateTime.parse(createdAt, formatter);
        return ((Long) localDateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli()).doubleValue();
    }
}
