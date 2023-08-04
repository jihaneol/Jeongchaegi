package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PolicyTypeRepository extends JpaRepository<PolicyType, String> {
    Optional<PolicyType> findById(String type);
}
