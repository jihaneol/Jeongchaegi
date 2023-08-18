package com.oppas.config.auth;

import com.oppas.entity.member.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

/**
 * 시큐리티가 login 주소 요청이 오면 낚아채서 로그인을 진행시킨다.
 * 로그인 진행이 완료가 되면 시큐리티 session을 만들어 줍니다. security contextholder
 * <p>
 * 오브젝트 타입 => authentication 타입 객체
 * authentication 안에 user정보가 있어야 됨
 * user오브젝트타입 => userDetails 타입 객체
 * <p>
 * Security session => Authentication => UserDetails
 * Authentication 객체에 저장할 수 있는 유일한 타입
 **/
public class PrincipalDetails implements UserDetails, OAuth2User { //2개 구현

    private static final long serialVersionUID = 1L;
    private Member member; //콤포지션
    private Map<String, Object> attributes;

    // 일반 시큐리티 로그인시 사용
    public PrincipalDetails(Member member) {
        this.member = member;
    }

    // OAuth2.0 로그인시 사용
    public PrincipalDetails(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    public Member getMember() {
        return member;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return member.getName();
    }

    public String getEmail() {
        return member.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 우리사이트 1년 동안 회원이 로그인을 안하면 !!
        // 현재 - 가입일 = 비번 바꾸셈 false
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collet = new ArrayList<GrantedAuthority>();
        collet.add(() -> {
            return member.getRole();
        });
        return collet;
    }

    // 리소스 서버로 부터 받는 회원정보
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    // User의 PrimaryKey
    @Override
    public String getName() {
        return String.valueOf(member.getId());
    }
    public  Long getId() {
        return member.getId();
    }

}
