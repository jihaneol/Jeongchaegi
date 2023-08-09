package com.oppas.repository;

import com.oppas.entity.event.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, String> {

    Calendar findByMemberId(Long memberId);

}
