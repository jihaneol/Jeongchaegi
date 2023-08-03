package com.oppas.entity.policy;

import com.oppas.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PolicyScrap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_scrap_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime time;


}
