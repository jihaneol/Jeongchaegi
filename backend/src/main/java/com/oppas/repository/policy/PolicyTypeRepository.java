package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyTypeRepository extends JpaRepository<PolicyType, String> {


    void find(List<String> policyId);
}
