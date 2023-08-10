package com.oppas.repository;

import com.oppas.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/**
 * @author cos
 * JPA는 기본 CRUD를 JpaRepository가 상속하는 CrudRepository가 가지고 있음.
 * JPA는 method names 전략을 가짐. README.md 사진 참고
 */

// JpaRepository 를 상속하면 자동 컴포넌트 스캔됨.
//@repository 라는 어노테이션이 없어도 loc되요, 이유는 jparepository를 상속했기 때문에
public interface MemberRepository extends JpaRepository<Member, Long> {



    Optional<Member> findByName(String name);

    Optional<Member> findByRefreshToken(String refreshToken);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByProviderAndProviderId(String provider, String providerId);



}


