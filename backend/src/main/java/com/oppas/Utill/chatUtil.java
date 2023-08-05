package com.oppas.Utill;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oppas.dto.PolicyChat;

public class chatUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Message 객체를 JSON 문자열로 변환하는 메서드
    public static String convertToJson(PolicyChat policyChat) {
        try {
            return objectMapper.writeValueAsString(policyChat);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}