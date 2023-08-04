package com.oppas.Utill;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oppas.dto.Message;

public class chatUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Message 객체를 JSON 문자열로 변환하는 메서드
    public static String convertToJson(Message message) {
        try {
            return objectMapper.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}