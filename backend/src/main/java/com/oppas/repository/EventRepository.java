package com.oppas.repository;

import com.oppas.entity.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, String> {

    Optional<Event> findByMemberIdAndPolicyId(Long memberId, Long policyId);

    Long countByPolicyId(Long policyId);

}
