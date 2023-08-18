package com.oppas.dto.policy;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HotPolicyDTO {
    private Long policyId;
    private String polyBizSjnm;
    private Long scrapCount;
    private String polyItcnCn;

    public HotPolicyDTO(Long policyId, String polyBizSjnm, Long scrapCount,String polyItcnCn) {
        this.policyId = policyId;
        this.polyBizSjnm = polyBizSjnm;
        this.scrapCount = scrapCount;
        this.polyItcnCn = polyItcnCn;
    }
}
