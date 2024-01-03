package com.oppas.entity.policy;

import com.oppas.dto.policyChat.PolicyChatSaveDto;
import com.oppas.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor// 기본생성자 생성
@AllArgsConstructor//모든 필드를 파라미터로 가지는 생성자
@Entity
@Getter
@Builder
public class PolicyChat {

    @Id
    @Column(name = "policy_chat_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(columnDefinition = "TIMESTAMP")
    private String createdAt;

    private String message;

    public static PolicyChat of(PolicyChatSaveDto policyChatSaveDto, Member member, Policy policy) {

        return PolicyChat.builder()
                .message(policyChatSaveDto.getMessage())
                .createdAt(policyChatSaveDto.getCreatedAt())
                .member(member)
                .policy(policy)
                .build();


    }


}
