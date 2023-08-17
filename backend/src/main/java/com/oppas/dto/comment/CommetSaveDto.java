package com.oppas.dto.comment;

import com.oppas.dto.comment.request.CommentRequestDto;
import com.oppas.entity.Member;
import com.oppas.entity.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
public class CommetSaveDto {

    private Member member;

    private Post post;

    private String comment;

    private LocalDateTime time;


    public static CommetSaveDto createSaveDto(Post post, Member member, CommentRequestDto commentRequestDto) {

       return CommetSaveDto.builder().
                member(member).
                post(post).
                comment(commentRequestDto.getComment()).
                time(LocalDateTime.now()).
                build();

    }

}
