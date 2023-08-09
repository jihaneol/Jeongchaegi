package com.oppas.dto.policy;

import com.oppas.entity.policy.Policy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.modelmapper.ModelMapper;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
@AllArgsConstructor
public class PolicyApiDTO {

    private final Integer id;

    private final Integer rnum;

    private final String bizId;

    private final String polyBizSjnm;

    private final String polyItcnCn;

    private final String sporCn;

    private final String sporScvl;

    private final String bizPrdCn;

    private final String prdRpttSecd;

    private final String rqutPrdCn;

    private final String ageInfo;

    private final String majrRqisCn;

    private final String empmSttsCn;

    private final String splzRlmRqisCn;

    private final String accrRqisCn;

    private final String prcpCn;

    private final String aditRscn;

    private final String prcpLmttTrgtCn;

    private final String rqutProcCn;

    private final String pstnPaprCn;

    private final String jdgnPresCn;

    private final String rqutUrla;

    private final String rfcSiteUrla1;

    private final String rfcSiteUrla2;

    private final String mngtMson;

    private final String mngtMrofCherCn;

    private final String cherCtpcCn;

    private final String cnsgNmor;

    private final String tintCherCn;

    private final String tintCherCtpcCn;

    private final String etct;

    private final String polyRlmCd;

    public Policy createPolicy(ModelMapper modelMapper) {
        Policy policy = modelMapper.map(this, Policy.class);
        Long policyId = Long.parseLong(this.getBizId().substring(1));
        policy.setId(policyId);

        // 정책 지역 초기화
        policy.setSrchPolyBizSecd("000000000");

        // 신청 가능 연령 파싱
        int minAge = 0;
        int maxAge = 99;
        Pattern pattern = Pattern.compile("만\\s*(\\d+)세\\s*~\\s*(\\d+)세");
        Matcher matcher = pattern.matcher(policy.getAgeInfo());

        if (matcher.find()) {
            minAge = Integer.parseInt(matcher.group(1));
            maxAge = Integer.parseInt(matcher.group(2));
        }
        policy.setMinAge(minAge);
        policy.setMaxAge(maxAge);

        return policy;
    }

}
