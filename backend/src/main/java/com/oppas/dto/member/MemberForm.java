package com.oppas.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MemberForm {
    private String nickname;
    private String city;
    private List<String> policyId;
    private int age;
}
