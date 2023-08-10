package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.event.EventDTO;
import com.oppas.entity.Member;
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

    @GetMapping("/form/policies/{policyId}")
    public ResponseEntity<EventDTO> getEventCreateForm(@PathVariable Long policyId) throws Exception {
        EventDTO event = eventService.getEventCreateForm(policyId);
        return ResponseEntity.ok(event);
    }

    @PostMapping("/save/policies/{policyId}")
    public ResponseEntity<String> saveEvent(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                            @PathVariable Long policyId, @RequestParam String eventId) throws Exception {
        Member member = principalDetails.getMember();
        eventService.saveEvent(eventId, member, policyId);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventId);
    }

}
