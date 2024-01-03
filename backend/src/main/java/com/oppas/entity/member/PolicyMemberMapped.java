package com.oppas.entity.member;

import com.oppas.entity.policy.PolicyType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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

}
