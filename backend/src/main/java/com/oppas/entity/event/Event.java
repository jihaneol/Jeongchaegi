package com.oppas.entity.event;

import com.oppas.entity.Member;
import com.oppas.entity.policy.Policy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Event {

    @Id
    @Column(name = "event_id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

}
