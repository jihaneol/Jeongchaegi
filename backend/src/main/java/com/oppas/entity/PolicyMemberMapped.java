package com.oppas.entity;

import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
public class PolicyMemberMapped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    @JoinColumn(name = "type_code", nullable = false)
    private PolicyType policyType;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime time;

    //
    protected PolicyMemberMapped() {

    }
    // 생성 메서드 //
}
