package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PolicyDateRepository extends JpaRepository<PolicyDate, Long> {

    Optional<PolicyDate> findByPolicyId(Long policyId);

}
