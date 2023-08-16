package com.oppas.dto.member;

import com.oppas.entity.PolicyMemberMapped;
import lombok.Data;

@Data
public class PolicyMemberDTO {

    private String id;
    private String type;

    public PolicyMemberDTO(PolicyMemberMapped policyMember) {
        id = policyMember.getPolicyType().getId();
        type = policyMember.getPolicyType().getType();
    }

}