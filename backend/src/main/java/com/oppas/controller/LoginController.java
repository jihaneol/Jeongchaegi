package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.MemberSignUpDTO;
import com.oppas.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

/**
 * 스프링 시큐리티
 * 시큐리티 세션
 * Authentication -> DI -> userDetails(일반 로그인),OAuth2user(카카오 등 로그인)
 */


@RestController
@RequiredArgsConstructor
@Slf4j
public class LoginController {
    private final MemberService memberService;

    @ExceptionHandler(RuntimeException.class)
    public Object processValidationError(RuntimeException ex) {
        log.info("에러 확인 {}", ex.getMessage());
        return ResponseEntity.badRequest().build();
//        return ApiResponse.error(ApiStatus.SYSTEM_ERROR, ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }

    @GetMapping("/members/find/{nickname}")
    public ResponseEntity<?> checkNickName(@PathVariable String nickname) {
        System.out.println(nickname);
        boolean flag = memberService.findNickName(nickname);
        if (flag) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/members/logout")
    public ResponseEntity<?> logout() {
        System.out.println("로그아웃 완료");
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/members/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody MemberSignUpDTO memberSignUpDTO) {
        System.out.println(memberSignUpDTO.getAge());
        System.out.println(memberSignUpDTO.getName());
        memberService.signUp(memberSignUpDTO);
        return ResponseEntity.ok().build();
    }

}
