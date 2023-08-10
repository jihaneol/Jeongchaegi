package com.oppas.service;

import com.oppas.entity.Member;
import com.oppas.entity.event.Calendar;
import com.oppas.repository.CalendarRepository;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;

@Service
@Transactional
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final MemberRepository memberRepository;

    /**
     * 회원 아이디를 통해 캘린더 가져오기
     */
    public Calendar getCalendar(Long memberId) throws Exception {
        return calendarRepository.findByMemberId(memberId);
    }

    /**
     * 생성된 캘린더 저장하기
     */
    public String saveCalendar(String calendarId, Long memberId) throws Exception {
        Member member = memberRepository.findById(memberId).orElseThrow(EntityExistsException::new);
        Calendar calendar = new Calendar(calendarId, member);
        calendarRepository.save(calendar);
        return calendarId;
    }

}
