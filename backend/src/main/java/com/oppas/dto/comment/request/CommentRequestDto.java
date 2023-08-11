package com.oppas.dto.comment.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CommentRequestDto {

    private Long postId;
    private Long commentId;
    private Long memberId;
    private String comment;

}
