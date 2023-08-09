package com.oppas.dto.policy;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PolicySummaryDTO {

    private Long id;

    private String polyBizSjnm; // 정책명

    private String polyItcnCn; // 정책 소개

    private LocalDate rqutPrdBegin; // 정책 신청기간 시작일

    private LocalDate rqutPrdEnd; // 정책 신청기간 마감일

    private Integer minAge; // 최소 연령

    private Integer maxAge; // 최대 연령

    private String type; // 정책 분야

    private String region; // 정책 지역

}
