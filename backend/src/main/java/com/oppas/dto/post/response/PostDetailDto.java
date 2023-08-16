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

    private String memberImg;

    private Long policyId;
    
    private String polyBizSjnm;// 정책명
    
    private String nickname;

    private String title;

    private String content;

    private LocalDateTime createdAt;


    public static PostDetailDto createPostDetailDto(Post post){

        PostDetailDto dto = PostDetailDto.builder().
                id(post.getId()).
                memberId(post.getMember().getId()).
                memberImg(post.getMember().getImg()).
                nickname(post.getMember().getNickname()).
                title(post.getTitle()).
                content(post.getContent()).
                createdAt(post.getCreatedAt()).
                build();

        return dto;
    }

    public void setPolicy(Long policyId, String polyBizSjnm){
        this.policyId = policyId;
        this.polyBizSjnm = polyBizSjnm;
    }
}
