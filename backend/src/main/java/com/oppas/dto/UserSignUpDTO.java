package com.oppas.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserSignUpDTO {

    private String email;
    private String policyType;
    private String nickname;
    private int age;
    private String city;
    private String name;
}