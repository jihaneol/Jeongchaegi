package com.oppas.entity.policy;

import com.oppas.dto.PolicyChatSaveDto;
import com.oppas.entity.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    public static PolicyChat of(PolicyChatSaveDto policyChatSaveDto,Member member,Policy policy){

        return PolicyChat.builder()
                .message(policyChatSaveDto.getMessage())
                .createdAt(policyChatSaveDto.getCreatedAt())
                .member(member)
                .policy(policy)
                .build();


    }


}
