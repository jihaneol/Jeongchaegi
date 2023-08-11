package com.oppas.dto.comment.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class CommentResponseDto {

    private Long id;

    private Long memberId;

    private String nickname;

    private String postId;

    private String comment;

    private LocalDateTime time;

    @Override
    public String toString() {
        return "CommentResponseDto{" +
                "id=" + id +
                ", memberId=" + memberId +
                ", nickname='" + nickname + '\'' +
                ", comment='" + comment + '\'' +
                ", time=" + time +
                '}';
    }
}
