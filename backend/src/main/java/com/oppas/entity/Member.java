package com.oppas.entity;

import com.oppas.dto.member.MemberSignUpDTO;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

// ORM - Object Relation Mapping

@Getter @Setter
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
    private String password;
    private String img;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(unique=true)
    private String nickname; // 닉네임
    private String role; //ROLE_USER, ROLE_ADMIN
    // OAuth를 위해 구성한 추가 필드 2개
    private String provider;
    private String providerId;
    private String kakoToken;
    @CreationTimestamp
    private Timestamp createDate;
    private String refreshToken; // 리프레시 토큰
    private boolean sign;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<PolicyMemberMapped> policyMemberMappeds = new ArrayList<>();

    //	@ColumnDefault("false")
//	@Column(columnDefinition = "TINYINT(1)")
//	private boolean join;
    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = "ROLE_USER";
    }


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

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
