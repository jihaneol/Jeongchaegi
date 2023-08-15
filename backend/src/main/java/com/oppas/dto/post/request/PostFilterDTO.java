package com.oppas.dto.post.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostFilterDTO {
    private String nickname; // 닉네임
    private String title; // 제목
    private String content; // 내용

}
