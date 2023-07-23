package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.model.User;
import com.oppas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * 스프링 시큐리티
 * 시큐리티 세션
 * Authentication -> DI -> userDetails(일반 로그인),OAuth2user(카카오 등 로그인)
 *
 */

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;
//
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // jwt
    @GetMapping("home")
    public String home(){
        return "<h1> home </h1>";
    }

    //oauth
    @GetMapping({ "", "/" })
    public @ResponseBody String index() {
        return "인덱스 페이지입니다.";
    }

    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails : "+principalDetails.getUser());
        return "user";
    }
    @GetMapping("/manager")
    public @ResponseBody String manager() {
        return "manager";
    }
    @GetMapping("/admin")
    public @ResponseBody String admin() {
        return "admin";
    }
    // 스프링 시큐리티 해당주소를 낚는다 - securityconfig 설정후에 말이다.
//    @GetMapping("/login")
//    public @ResponseBody String login() {
//        return "login";
//    }
    @GetMapping("/loginForm")
    public  String login() {
        return "loginForm";
    }

    @GetMapping("/joinForm")
    public  String joinForm() {
        return "joinForm";
    }

    @PostMapping("/join")
    public  String join(User user) {
        System.out.println(user);
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        userRepository.save(user); // 비번 암호화 해줘야 한다.
        return "redirect:/loginForm";
    }

    //@preAuthorize("hasRole('ROLE_~) or hasRole('ROLE_~)") 여러개 설정
    @Secured("ROLE_ADMIN") // 권한이 이거인것만 접근 가능
    @GetMapping("/info")
    public @ResponseBody String info(){
        return "개인정보";
    }

    @GetMapping("/test/login")
    public @ResponseBody String testLogin(
            @AuthenticationPrincipal PrincipalDetails userDetails){ // OAuth2User DI의존성 주입
        System.out.println("test =====================");
        System.out.println("userDetails : "+ userDetails.getUser());
        return "세션 정보 확인하기";
    }
    @GetMapping("/test/oauth/login")
    public @ResponseBody String testOAuthLogin(
            Authentication authentication){
        System.out.println("test/oauth =====================");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("userDetails : "+ oAuth2User.getAttributes());
        return " OAuth 세션 정보 확인하기";
    }


}
