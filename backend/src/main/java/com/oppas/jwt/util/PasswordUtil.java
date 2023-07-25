package com.oppas.jwt.util;

import java.security.SecureRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PasswordUtil
{
    // 특정 길이의 임의의 영숫자 비밀번호를 생성하는 메소드
    public static String generateRandomPassword()
    {
        // ASCII 범위 – 영숫자(0-9, a-z, A-Z)
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        SecureRandom random = new SecureRandom();

        // 루프의 각 반복은 주어진 문자에서 무작위로 문자를 선택합니다.
        // ASCII 범위를 `StringBuilder` 인스턴스에 추가합니다.
        return IntStream.range(0, 10)
                .map(i -> random.nextInt(chars.length()))
                .mapToObj(randomIndex -> String.valueOf(chars.charAt(randomIndex)))
                .collect(Collectors.joining());
    }


}