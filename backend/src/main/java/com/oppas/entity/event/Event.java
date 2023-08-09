package com.oppas.entity.event;

import com.oppas.entity.policy.PolicyDate;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Event {

    @Id
    @Column(name = "event_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calendar_id", nullable = false)
    private Calendar calendar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_date_id", nullable = false)
    private PolicyDate policyDate;

}
