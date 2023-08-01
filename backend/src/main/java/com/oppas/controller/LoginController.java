package com.oppas.controller;

import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.UserSignUpDTO;
import com.oppas.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/**
 * 스프링 시큐리티
 * 시큐리티 세션
 * Authentication -> DI -> userDetails(일반 로그인),OAuth2user(카카오 등 로그인)
 */

@Controller
@RequiredArgsConstructor
public class LoginController {
    JwtService jwtService;

    @GetMapping("/")
    public String domain() {
        System.out.println("도메인");
        return "loginForm";
    }

    @DeleteMapping("member/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal PrincipalDetails principalDetails) {


        System.out.println("로그인 완료");

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("member/signup")
    public ResponseEntity<?> sign(@RequestBody UserSignUpDTO userSignUpDTO) {

        

        System.out.println("로그인 완료");

        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/data")
    public ResponseEntity<?> data() {
        System.out.println("시발 뭐야");
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/test")
    public String test() {
        System.out.println("시발 뭐야");
        return "joinForm";
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> rep() {
        System.out.println("이건 뭔데 시발");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/logout2")
    public String access() throws IOException {


        return "redirect:/";
    }



}
