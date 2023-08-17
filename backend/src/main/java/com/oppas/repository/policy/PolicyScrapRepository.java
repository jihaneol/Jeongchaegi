package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyScrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PolicyScrapRepository extends JpaRepository<PolicyScrap, Long> {

    List<PolicyScrap> findAllByMemberId(Long memberId);

    Long countByMemberId(Long memberId);

    PolicyScrap findByMemberIdAndPolicyId(Long memberId, Long policyId);

    void deleteByMemberIdAndPolicyId(Long memberId, Long policyId);

    @Query("SELECT ps.policy.id, ps.policy.polyBizSjnm, COUNT(ps.policy) as scrapCount " +
            "FROM PolicyScrap ps " +
            "GROUP BY ps.policy " +
            "ORDER BY scrapCount DESC")
    List<Object[]> findMostScrappedPolicies();

    default List<Object[]> findTop10MostScrappedPolicies() {
        List<Object[]> list =  findMostScrappedPolicies();
        System.out.println(list.size());
        if(list.size()<10){
            return findMostScrappedPolicies().subList(0, list.size());
        }
        return findMostScrappedPolicies().subList(0, 10);
    }

}
