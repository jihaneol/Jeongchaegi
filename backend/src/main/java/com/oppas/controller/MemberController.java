package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.MemberSignUpDTO;
import com.oppas.entity.Member;
import com.oppas.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * 스프링 시큐리티
 * 시큐리티 세션
 * Authentication -> DI -> userDetails(일반 로그인),OAuth2user(카카오 등 로그인)
 */


@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;

    @ExceptionHandler(RuntimeException.class)
    public Object processValidationError(RuntimeException ex) {
        log.info("에러 확인 {}", ex.getMessage());
        return ResponseEntity.badRequest().build();
//        return ApiResponse.error(ApiStatus.SYSTEM_ERROR, ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }

    @GetMapping("/find/{nickname}")
    public ResponseEntity<?> checkNickName(@PathVariable String nickname) {
        boolean flag = memberService.findNickName(nickname);
        if (flag) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/refresh-token")
    public ResponseEntity<?> refreshToekn() {
        log.info("토큰 재발급");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout() {
        log.info("로그 아웃 완료");
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody MemberSignUpDTO memberSignUpDTO, Authentication authentication) {
        PrincipalDetails principalDetails =(PrincipalDetails) authentication.getPrincipal();
        long id = principalDetails.getId();
        memberService.signUp(memberSignUpDTO,id);
        log.info("회원가입 성공");
        // 리다이렉트

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 회원 정보 전달
    @GetMapping("/info")
    public MemberResponse info(Authentication authentication) {
        PrincipalDetails principalDetails =(PrincipalDetails) authentication.getPrincipal();
        Member member = principalDetails.getMember();
        return new MemberResponse(member.getId(),member.getAge(), member.getNickname(), member.getCity());
    }


    @AllArgsConstructor
     static class MemberResponse {
        private Long id;
        private Integer age;
        private String nickname;
        private String city;
    }
}
