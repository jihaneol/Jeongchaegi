package com.oppas.entity;

import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
public class PolicyScrap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // 이거 아라ㅐ와 같이 객체지향적으로/.?
    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    private Long memberId;// memberCLASS생기면 넣기

    @Column(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    @JoinColumn(name = "policy_id")
    private Policy policy;

    @Column(nullable = false)
    private Timestamp time;


}
