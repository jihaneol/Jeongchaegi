package com.oppas.repository.policy;

import com.oppas.dto.policy.PolicyFilterDTO;
import com.oppas.entity.policy.Policy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PolicyRepositoryCustom {

    Page<Policy> findPolicies(PolicyFilterDTO filter, Pageable pageable);

}
