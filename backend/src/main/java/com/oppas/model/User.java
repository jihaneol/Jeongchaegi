package com.oppas.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

// ORM - Object Relation Mapping

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
public class User {
	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int age;
	private String city;
	private String username;
	private String password;
	private String email;
	private String nickname; // 닉네임
	private String role; //ROLE_USER, ROLE_ADMIN
	// OAuth를 위해 구성한 추가 필드 2개
	private String provider;
	private String providerId;
	@CreationTimestamp
	private Timestamp createDate;
	private String refreshToken; // 리프레시 토큰
	// 유저 권한 설정 메소드
	public void authorizeUser() {
		this.role = "ROLE_USER";
	}

	// 비밀번호 암호화 메소드
	public void passwordEncode(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.password);
	}

	public void updateRefreshToken(String updateRefreshToken) {
		this.refreshToken = updateRefreshToken;
	}

}
