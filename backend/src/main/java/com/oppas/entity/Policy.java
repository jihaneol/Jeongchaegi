package com.oppas.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Policy {

    @Id
    @Column(name = "policy_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    private LocalDateTime beginDate;

    private LocalDateTime endDate;

    private int minAge;

    private int maxAge;

    private String site;

    @OneToMany(mappedBy = "policy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PolicyChat> policyChats = new ArrayList<>();

}
