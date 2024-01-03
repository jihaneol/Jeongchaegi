package com.oppas.entity.policy;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class Policy {

    @Id
    @Column(name = "policy_id")
    private Long id;

    @Column(nullable = false)
    private String polyBizSjnm; // 정책명

    @Lob
    private String polyItcnCn; // 정책 소개

    @Lob
    private String sporCn; // 지원 내용

    @Lob
    private String sporScvl; // 지원 규모

    @Lob
    private String bizPrdCn; // 사업 운영기간 내용

    @Lob
    private String rqutPrdCn; // 사업 신청기간 내용

    private String ageInfo; // 연령 정보

    private Integer minAge; // 최소 연령

    private Integer maxAge; // 최대 연령

    @Lob
    private String majrRqisCn; // 전공 요건 내용

    @Lob
    private String empmSttsCn; // 취업 상태 내용

    @Lob
    private String splzRlmRqisCn; // 특화 분야 내용

    @Lob
    private String accrRqisCn; // 학력 요건 내용

    @Lob
    private String prcpCn; // 거주지 및 소득 조건 내용

    @Lob
    private String aditRscn; // 추가 단서 사항 내용

    @Lob
    private String prcpLmttTrgtCn; // 참여 제한 대상 내용

    @Lob
    private String rqutProcCn; // 신청 절차 내용

    @Lob
    private String pstnPaprCn; // 제출 서류 내용

    @Lob
    private String jdgnPresCn; // 심사 및 처리과정 내용

    @Lob
    private String rqutUrla; // 신청 사이트 주소

    @Lob
    private String rfcSiteUrla1; // 참고 사이트 URL 1

    @Lob
    private String rfcSiteUrla2; // 참고 사이트 URL 2

    private String mngtMson; // 주관 부처명

    private String mngtMrofCherCn; // 주관 부처 담당자 이름

    private String cherCtpcCn; // 주관 부처 담당자 연락처

    private String cnsgNmor; // 운영 기관명

    @Lob
    private String tintCherCn; // 운영 기관 담당자 이름

    private String tintCherCtpcCn; // 운영 기관 담당자 연락처

    @Lob
    private String etct; // 기타사항

    @Column(nullable = false)
    private String polyRlmCd; // 정책 분야 코드

    private String srchPolyBizSecd; // 정책 지역 코드

    private Boolean isOngoing; // 정책 신청 진행 여부

    @OneToMany(mappedBy = "policy")
    private List<PolicyDate> policyDates = new ArrayList<>(); // 신청 날짜 리스트

}
