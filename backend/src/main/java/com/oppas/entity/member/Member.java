package com.oppas.entity.member;

import com.oppas.dto.member.MemberSignUpDTO;
import com.oppas.entity.Post;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

// ORM - Object Relation Mapping

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
public class Member {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;
    private Integer age;
    private String city;
    private String img;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(unique = true)
    private String nickname;
    private String role; //ROLE_USER, ROLE_ADMIN
    // Oauth2를 위해 구성한 추가 필드 2개
    private String provider;
    private String providerId;
    private String kakaoToken;
    @CreationTimestamp
    private Timestamp createDate;
    private String refreshToken; // 리프레시 토큰
    private boolean sign;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<PolicyMemberMapped> policyMemberMappeds = new ArrayList<>();

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
    private final List<Follow> followerList = new ArrayList<>();


    @OneToMany(mappedBy = "followee", cascade = CascadeType.ALL)
    private final List<Follow> followeeList = new ArrayList<>();


    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private final List<Post> post = new ArrayList<>();


    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

    public void updateJoin(boolean flag) {
        this.sign = true;
    }

    public void join(MemberSignUpDTO userSignUpDTO) {
        this.city = userSignUpDTO.getCity();
        this.age = userSignUpDTO.getAge();
        this.nickname = userSignUpDTO.getNickname();
    }

    public int postCount() {
        return this.post.size();
    }

    public int followCount() {
        return this.followerList.size();
    }

    public int followeeCount() {
        return this.followeeList.size();
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
