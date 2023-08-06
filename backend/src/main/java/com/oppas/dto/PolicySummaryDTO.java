package com.oppas.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PolicySummaryDTO {

    private Long id;

    private String polyBizSjnm; // 정책명

    private String polyItcnCn; // 정책 소개

    private String sporCn; // 지원 내용

    private String sporScvl; // 지원 규모

    private String bizPrdCn; // 사업 운영기간 내용

    private String rqutPrdCn; // 사업 신청기간 내용

    private String ageInfo; // 연령 정보

    private Integer minAge; // 최소 연령

    private Integer maxAge; // 최대 연령

    private String rqutUrla; // 신청 사이트 주소

    private String polyRlmCd; // 정책 분야 코드

    private String srchPolyBizSecd; // 정책 지역 코드

}
