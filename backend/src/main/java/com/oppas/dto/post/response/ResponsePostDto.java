package com.oppas.dto.post.response;

import com.oppas.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponsePostDto {

    private Long id;

    private String title;

    private Long memberId;

    private String content;
}
