package com.oppas.service;

import com.oppas.dto.event.EventDTO;
import com.oppas.dto.event.TimeDTO;
import com.oppas.entity.Member;
import com.oppas.entity.event.Event;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyDate;
import com.oppas.repository.EventRepository;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.policy.PolicyDateRepository;
import com.oppas.repository.policy.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;
    private final PolicyRepository policyRepository;
    private final PolicyDateRepository policyDateRepository;

    /**
     * 정책 정보를 통해 일정 생성 폼 반환
     */
    public EventDTO getEventCreateForm(Long policyId) throws Exception {
        PolicyDate policyDate = policyDateRepository.findByPolicyId(policyId).orElseThrow();
        String startAt = policyDate.getRqutPrdBegin().toString() + "T03:00:00Z";
        String endAt = policyDate.getRqutPrdEnd().toString() + "T03:00:00Z";
        TimeDTO time = new TimeDTO(startAt, endAt, "Asia/Seoul", true, false);

        Policy policy = policyDate.getPolicy();
        String title = policy.getPolyBizSjnm();
        String description = policy.getPolyItcnCn();
        Integer[] reminders = new Integer[]{900, -540};

        return new EventDTO(title, time, null, description, null, reminders, "ROYAL_BLUE");
    }

    /**
     * 일정을 캘린더에 저장하기
     */
    public void saveEvent(String eventId, Member member, Long policyId) throws Exception {
        Policy policy = policyRepository.findById(policyId).orElseThrow(EntityNotFoundException::new);
        Event event = new Event(eventId, member, policy);
        eventRepository.save(event);
    }

}
