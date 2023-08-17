package com.oppas.dto.policy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PolicyScrapDTO {
    private final Long memberId;
    private final Long policyId;
}
