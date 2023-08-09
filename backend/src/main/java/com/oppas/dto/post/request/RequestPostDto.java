package com.oppas.dto.post.request;

import com.oppas.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RequestPostDto {

    private Long id;

    private String title;

    private Member member;

    private String content;

    private LocalDateTime createdAt;

    public void setMember(Member member){
        this.member = member;
    }

    @Override
    public String toString() {
        return "RequestPostDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", member=" + member.getId() +
                ", content='" + content + '\'' +
                '}';
    }
}
