package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.event.EventDTO;
import com.oppas.repository.CalendarRepository;
import com.oppas.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final CalendarRepository calendarRepository;

    @GetMapping("/form/policies/{policyId}")
    public ResponseEntity<EventDTO> getEventCreateForm(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                       @PathVariable Long policyId) throws Exception {
        Long memberId = principalDetails.getId();
        EventDTO eventDTO = eventService.getEventCreateForm(memberId, policyId);
        return ResponseEntity.ok(eventDTO);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveEvent(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                            @RequestParam String eventId) throws Exception {
        Long memberId = principalDetails.getId();
        eventService.saveEvent(eventId, memberId);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventId);
    }

}
