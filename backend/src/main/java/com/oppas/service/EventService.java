package com.oppas.service;

import com.oppas.dto.event.EventDTO;
import com.oppas.dto.event.TimeDTO;
import com.oppas.entity.event.Event;
import com.oppas.entity.member.Member;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyDate;
import com.oppas.repository.EventRepository;
import com.oppas.repository.policy.PolicyDateRepository;
import com.oppas.repository.policy.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
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
    public List<String> checkEvent(Long memberId, Long policyId) throws Exception {
        List<Event> events = eventRepository.findByMemberIdAndPolicyId(memberId, policyId);
        List<String> eventIds = new ArrayList<>();
        for (Event event : events) {
            eventIds.add(event.getId());
        }
        return eventIds;
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
    public List<EventDTO> getEventCreateForm(Long policyId) throws Exception {
        List<EventDTO> events = new ArrayList<>();
        PolicyDate policyDate = policyDateRepository.findByPolicyId(policyId).orElseThrow();

        String dateBegin1 = policyDate.getRqutPrdBegin() + "T00:00:00Z";
        String dateBegin2 = policyDate.getRqutPrdBegin().plusDays(1) + "T00:00:00Z";
        String dateEnd1 = policyDate.getRqutPrdEnd() + "T00:00:00Z";
        String dateEnd2 = policyDate.getRqutPrdEnd().plusDays(1) + "T00:00:00Z";
        TimeDTO time1 = new TimeDTO(dateBegin1, dateBegin2, "Asia/Seoul", true, false);
        TimeDTO time2 = new TimeDTO(dateEnd1, dateEnd2, "Asia/Seoul", true, false);

        Policy policy = policyDate.getPolicy();
        String title1 = policy.getPolyBizSjnm() + " (신청 시작일)";
        String title2 = policy.getPolyBizSjnm() + " (신청 마감일)";
        String description = policy.getPolyItcnCn();
        Integer[] reminders = new Integer[]{900, -540};

        events.add(new EventDTO(title1, time1, null, description, null, reminders, "ROYAL_BLUE"));
        events.add(new EventDTO(title2, time2, null, description, null, reminders, "ROYAL_BLUE"));

        return events;
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
