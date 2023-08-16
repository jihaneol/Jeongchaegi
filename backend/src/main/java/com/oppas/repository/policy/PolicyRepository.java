package com.oppas.repository.policy;

import com.oppas.entity.policy.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long>, PolicyRepositoryCustom {

}
