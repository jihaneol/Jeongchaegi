package com.oppas.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY) // 지연로딩 사용
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(nullable = false)
    private String comment;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime time;


    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", member=" + member.getId() +
                ", post=" + post.getId() +
                ", comment='" + comment + '\'' +
                ", time=" + time +
                '}';
    }
}
