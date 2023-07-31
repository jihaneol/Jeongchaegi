package com.oppas.entity.policy;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class PolicyDate {

    @Id
    @Column(name = "policy_date_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    private LocalDate rqutPrdBegin; // 정책 신청기간 시작일

    private LocalDate rqutPrdEnd; // 정책 신청기간 마감일

}
