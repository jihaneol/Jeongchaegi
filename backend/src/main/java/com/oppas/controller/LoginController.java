package com.oppas.controller;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.oppas.config.auth.PrincipalDetails;
import com.oppas.jwt.JwtService;
import com.oppas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
    public ResponseEntity<?> logout() {
//        "https://kauth.kakao.com/oauth/logout?client_id=${YOUR_REST_API_KEY}&logout_redirect_uri=${YOUR_LOGOUT_REDIRECT_URI}"
        System.out.println("로그아웃 완료");

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/data")
    public ResponseEntity<?> data() {
        System.out.println("시발 뭐야");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> rep() {
        System.out.println("이건 뭔데 시발");
        return new ResponseEntity(HttpStatus.OK);
    }


}
