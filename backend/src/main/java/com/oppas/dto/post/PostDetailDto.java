package com.oppas.dto.post;

import com.oppas.entity.Post;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostDetailDto {

    private Long id;

    private Long memberId;

    private String nickname;

    private String title;

    private String content;


    public static PostDetailDto createPostDetailDto(Post post){

        PostDetailDto dto = PostDetailDto.builder().
                id(post.getId()).
                memberId(post.getMember().getId()).
                nickname(post.getMember().getNickname()).
                title(post.getTitle()).
                content(post.getContent()).build();

        return dto;
    }

    @Override
    public String toString() {
        return "PostDetailDto{" +
                "id=" + id +
                ", memberId=" + memberId +
                ", nickname='" + nickname + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
