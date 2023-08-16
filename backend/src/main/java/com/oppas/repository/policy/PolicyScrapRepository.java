package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyScrap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PolicyScrapRepository extends JpaRepository<PolicyScrap, Long> {

    List<PolicyScrap> findAllByMemberId(Long memberId);

    Long countByMemberId(Long memberId);

    PolicyScrap findByMemberIdAndPolicyId(Long memberId, Long policyId);

    void deleteByMemberIdAndPolicyId(Long memberId, Long policyId);

}
