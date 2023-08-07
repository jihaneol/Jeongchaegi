package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyDateRepository extends JpaRepository<PolicyDate, Long> {

    PolicyDate findByPolicyId(Long policyId);

}
