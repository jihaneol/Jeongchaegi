package com.oppas.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Getter

public class MemberSignUpDTO {

    @NotBlank
    private String email;
    @NotBlank
    private String policyType;
    @NotBlank
    private String nickname;
    @NotNull
    @Min(value = 18, message = "나이먹고 와라")
    private Integer age;
    @NotBlank
    private String city;
    @NotBlank
    private String name;
}