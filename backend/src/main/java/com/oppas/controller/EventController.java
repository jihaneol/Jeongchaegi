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

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/possible/policies/{policyId}")
    public ResponseEntity<Boolean> isPossibleEvent(@PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(eventService.isPossibleEvent(policyId));
    }

    @GetMapping("/check/policies/{policyId}")
    public ResponseEntity<List<String>> checkEvent(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                              @PathVariable Long policyId) throws Exception {
        Long memberId = principalDetails.getId();
        return ResponseEntity.ok(eventService.checkEvent(memberId, policyId));
    }

    @GetMapping("/count/policies/{policyId}")
    public ResponseEntity<Long> countMyEvents(@PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(eventService.countMyEvents(policyId));
    }

    @GetMapping("/form/policies/{policyId}")
    public ResponseEntity<List<EventDTO>> getEventCreateForm(@PathVariable Long policyId) throws Exception {
        List<EventDTO> events = eventService.getEventCreateForm(policyId);
        return ResponseEntity.ok(events);
    }

    @PostMapping("/{eventId}/save/policies/{policyId}")
    public ResponseEntity<String> saveEvent(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                            @PathVariable String eventId, @PathVariable Long policyId) throws Exception {
        Member member = principalDetails.getMember();
        eventService.saveEvent(eventId, member, policyId);
        return ResponseEntity.status(HttpStatus.CREATED).body(eventId);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<String> deleteEvent(@PathVariable String eventId) throws Exception {
        return ResponseEntity.ok(eventService.deleteEvent(eventId));
    }

}
