package com.oppas.repository;

import com.oppas.entity.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, String> {

    List<Event> findByMemberIdAndPolicyId(Long memberId, Long policyId);

    Long countByPolicyId(Long policyId);

}
