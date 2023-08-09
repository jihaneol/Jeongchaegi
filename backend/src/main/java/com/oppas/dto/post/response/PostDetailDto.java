package com.oppas.dto.post.response;

import com.oppas.entity.Post;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostDetailDto {

    private Long id;

    private Long memberId;

    private String nickname;

    private String title;

    private String content;

    private LocalDateTime createdAt;


    public static PostDetailDto createPostDetailDto(Post post){

        PostDetailDto dto = PostDetailDto.builder().
                id(post.getId()).
                memberId(post.getMember().getId()).
                nickname(post.getMember().getNickname()).
                title(post.getTitle()).
                content(post.getContent()).
                createdAt(post.getCreatedAt()).
                build();

        return dto;
    }
}
