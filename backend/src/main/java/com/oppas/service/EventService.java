package com.oppas.service;

import com.oppas.dto.event.EventDTO;
import com.oppas.dto.event.TimeDTO;
import com.oppas.entity.Member;
import com.oppas.entity.event.Event;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyDate;
import com.oppas.repository.EventRepository;
import com.oppas.repository.policy.PolicyDateRepository;
import com.oppas.repository.policy.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final PolicyRepository policyRepository;
    private final PolicyDateRepository policyDateRepository;

    /**
     * 해당 정책에 대해 일정 등록 가능 여부 파악
     */
    public Boolean isPossibleEvent(Long policyId) throws Exception {
        Optional<PolicyDate> policyDate = policyDateRepository.findByPolicyId(policyId);
        return policyDate.isPresent();
    }

    /**
     * 정책에 대한 일정 가져오기
     */
    public String checkEvent(Long memberId, Long policyId) throws Exception {
        Optional<Event> event = eventRepository.findByMemberIdAndPolicyId(memberId, policyId);
        return event.map(Event::getId).orElse(null);
    }

    /**
     * 해당 정책 일정을 등록한 사용자의 수
     */
    public Long countMyEvents(Long policyId) throws Exception {
        return eventRepository.countByPolicyId(policyId);
    }

    /**
     * 정책 정보를 통해 일정 생성 폼 반환
     */
    public EventDTO getEventCreateForm(Long policyId) throws Exception {
        PolicyDate policyDate = policyDateRepository.findByPolicyId(policyId).orElseThrow();
        String startAt = policyDate.getRqutPrdBegin().toString() + "T00:00:00Z";
        String endAt = policyDate.getRqutPrdEnd().toString() + "T00:00:00Z";
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

    /**
     * 일정을 캘린더에서 지우기
     */
    public String deleteEvent(String eventId) throws Exception {
        eventRepository.deleteById(eventId);
        return eventId;
    }
}
