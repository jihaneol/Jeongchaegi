package com.oppas.entity.policy;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class PolicyRegion {

    @Id
    @Column(name = "region_code")
    private String id;

    private String region;

}
