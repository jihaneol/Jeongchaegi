package com.oppas.repository;

import com.oppas.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    Policy findByBizId(String bizId);

}
