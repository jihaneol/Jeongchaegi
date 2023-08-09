package com.oppas.repository;

import com.oppas.entity.PolicyMemberMapped;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PolicyMemberMappedRepository extends JpaRepository<PolicyMemberMapped, Long> {


}
