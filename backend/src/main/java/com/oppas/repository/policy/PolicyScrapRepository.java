package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyScrap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyScrapRepository extends JpaRepository<PolicyScrap, Long> {

    Page<PolicyScrap> findAllByMemberId(Long memberId, Pageable pageable);

    Long countByMemberId(Long memberId);

    PolicyScrap findByMemberIdAndPolicyId(Long memberId, Long policyId);

    void deleteByMemberIdAndPolicyId(Long memberId, Long policyId);

}
