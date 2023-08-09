package com.oppas.dto.member;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@RequiredArgsConstructor
@Getter

public class MemberSignUpDTO {

    @NotEmpty
    private List<String> policyId;
    @NotBlank
    private String nickname;
    @NotNull
    @Min(value = 18, message = "나이 부족")
    private Integer age;
    @NotBlank
    private String city;

}