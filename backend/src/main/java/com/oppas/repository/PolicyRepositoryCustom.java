package com.oppas.repository;

import com.oppas.dto.PolicyFilterDTO;
import com.oppas.entity.policy.Policy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PolicyRepositoryCustom {

    Page<Policy> findPolicies(PolicyFilterDTO filter, Pageable pageable);

}
