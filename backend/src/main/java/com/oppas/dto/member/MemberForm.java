package com.oppas.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MemberForm {
    private String nickName;
    private String city;
    private List<String> policyId;
}
