package com.oppas.dto.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class CalendarDTO {
    private String name;
    private String color;
    private Integer reminder;
    private Integer reminderAllDay;
}
