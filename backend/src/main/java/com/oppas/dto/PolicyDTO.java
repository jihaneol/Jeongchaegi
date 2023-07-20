package com.oppas.dto;

import com.oppas.entity.Policy;
import lombok.*;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class PolicyDTO {
    private final Long id;
    private final int rnum;
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
        return modelMapper.map(this, Policy.class);
    }
}
