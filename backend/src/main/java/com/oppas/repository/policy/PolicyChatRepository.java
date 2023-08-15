package com.oppas.repository.policy;

import com.oppas.entity.policy.PolicyChat;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyChatRepository extends JpaRepository<PolicyChat, Long>{
    Slice<PolicyChat> findAllByCreatedAtBeforeAndPolicy_IdOrderByCreatedAtDesc(String cursorCreatedAt, Long policyID, Pageable pageable);
    List<PolicyChat> findAllByCreatedAtAfterOrderByCreatedAtDesc(String cursorCreatedAt);
}
