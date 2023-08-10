package com.oppas.dto.comment.response;

import com.oppas.entity.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponseDto {

    private Long id;

    private Long memberId;

    private String nickname;

    private Post post;

    private String comment;

    private LocalDateTime time;

}
