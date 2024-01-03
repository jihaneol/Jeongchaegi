package com.oppas.dto.post.request;

import com.oppas.entity.member.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RequestPostDto {

    private Long id;

    private String title;

    private Member member;

    private Long memberId;

    private String content;

    private LocalDateTime createdAt;

    public void setMember(Member member) {
        this.member = member;
    }

    @Override
    public String toString() {
        return "RequestPostDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", memberId=" + memberId +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
