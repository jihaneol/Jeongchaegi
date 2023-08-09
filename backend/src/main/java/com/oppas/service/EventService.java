package com.oppas.service;

import com.oppas.dto.event.EventCreateDTO;
import com.oppas.dto.event.EventDTO;
import com.oppas.dto.event.TimeDTO;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyDate;
import com.oppas.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    /**
     * 정책 정보들을 통해 이벤트 생성 폼을 반환
     */
    public EventDTO getEventForm(String calendarId, PolicyDate policyDate) throws Exception {
        String startAt = policyDate.getRqutPrdBegin().toString() + "T03:00:00Z";
        String endAt = policyDate.getRqutPrdEnd().toString() + "T03:00:00Z";
        TimeDTO time = new TimeDTO(startAt, endAt, "Asia/Seoul", true, false);

        Policy policy = policyDate.getPolicy();
        String title = policy.getPolyBizSjnm();
        String description = policy.getPolyItcnCn();
        Integer[] reminders = new Integer[]{900, -540};
        EventCreateDTO event = new EventCreateDTO(title, time, null, description, null, reminders, "ROYAL_BLUE");

        return new EventDTO(calendarId, event);
    }

}
