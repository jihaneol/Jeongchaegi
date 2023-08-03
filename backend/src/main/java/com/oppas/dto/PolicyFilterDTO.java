package com.oppas.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PolicyFilterDTO {
    private List<String> types; // 정책 구분 코드
    private String region; // 지역 코드
    private Integer age; // 나이
    private String keyword; // 검색 키워드
    private String date; // 날짜
}
