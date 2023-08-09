package com.oppas.dto.post.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ResponsePostDto {

    private Long id;

    private String title;

    private Long memberId;

    private String nickname;

    private String content;

    private LocalDateTime createdAt;
}
