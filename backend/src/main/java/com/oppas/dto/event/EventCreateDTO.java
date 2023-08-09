package com.oppas.dto.event;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class EventCreateDTO {
    private String title;
    private TimeDTO time;
    private String rrule;
    private String description;
    private LocationDTO location;
    private Integer[] reminders;
    private String color;
}