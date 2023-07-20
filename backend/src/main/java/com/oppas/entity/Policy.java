package com.oppas.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
public class Policy {

    @Id
    @Column(name = "policy_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String polyBizSjnm; // 정책명

    private String polyItcnCn; // 정책 소개

    private String sporCn; // 지원 내용

    private String sporScvl; // 지원 규모

    private String bizPrdCn; // 사업 운영기간 내용

    private String rqutPrdCn; // 사업 신청기간 내용

    private String ageInfo; // 연령 정보

    private String majrRqisCn; // 전공 요건 내용

    private String empmSttsCn; // 취업 상태 내용

    private String splzRlmRqisCn; // 특화 분야 내용

    private String accrRqisCn; // 학력 요건 내용

    private String prcpCn; // 거주지 및 소득 조건 내용

    private String aditRscn; // 추가 단서 사항 내용

    private String prcpLmttTrgtCn; // 참여 제한 대상 내용

    private String rqutProcCn; // 신청 절차 내용

    private String pstnPaprCn; // 제출 서류 내용

    private String jdgnPresCn; // 심사 및 처리과정 내용

    private String rqutUrla; // 신청 사이트 주소

    private String rfcSiteUrla1; // 참고 사이트 URL 1

    private String rfcSiteUrla2; // 참고 사이트 URL 2

    private String mngtMson; // 주관 부처명

    private String mngtMrofCherCn; // 주관 부처 담당자 이름

    private String cherCtpcCn; // 주관 부처 담당자 연락처

    private String cnsgNmor; // 운영 기관명

    private String tintCherCn; // 운영 기관 담당자 이름

    private String tintCherCtpcCn; // 운영 기관 담당자 연락처

    private String etct; // 기타사항

    private String polyRlmCd; // 정책 분야 코드

    private String srchPolyBizSecd; // 정책 지역 코드

    @OneToMany(mappedBy = "policy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PolicyChat> policyChats = new ArrayList<>();

}
