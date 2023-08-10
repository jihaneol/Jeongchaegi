package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.entity.event.Calendar;
import com.oppas.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/calendar")
    public ResponseEntity<String> getCalendar(@AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception {
        Long memberId = principalDetails.getId();
        Calendar calendar = calendarService.getCalendar(memberId);
        if (calendar != null) {
            return ResponseEntity.ok(calendar.getId());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveCalendar(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                 @RequestParam String calendarId) throws Exception {
        Long memberId = principalDetails.getId();
        calendarService.saveCalendar(calendarId, memberId);
        return ResponseEntity.status(HttpStatus.CREATED).body(calendarId);
    }

}
