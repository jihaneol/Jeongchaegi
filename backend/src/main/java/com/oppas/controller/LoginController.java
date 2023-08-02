package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.UserSignUpDTO;
import com.oppas.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URISyntaxException;

/**
 * 스프링 시큐리티
 * 시큐리티 세션
 * Authentication -> DI -> userDetails(일반 로그인),OAuth2user(카카오 등 로그인)
 */

@Controller
//@RestController
@RequiredArgsConstructor
@Slf4j
public class LoginController {
    private final UserService userService;
    @ExceptionHandler(RuntimeException.class)
    public Object processValidationError(RuntimeException ex) {
        log.info("에러 확인 {}", ex.getMessage());
        return ResponseEntity.badRequest().build();
//        return ApiResponse.error(ApiStatus.SYSTEM_ERROR, ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }

    @GetMapping("/")
    public String domain() {
        System.out.println("도메인");
        return "loginForm";
    }

    @DeleteMapping("/member/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal PrincipalDetails principalDetails) {


        System.out.println("로그아웃 완료");

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/members/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserSignUpDTO userSignUpDTO)  {
        System.out.println(userSignUpDTO.getAge());
        System.out.println(userSignUpDTO.getName());
        userService.signUp(userSignUpDTO);


        return ResponseEntity.ok().build();
    }


    @GetMapping("/data")
    public ResponseEntity<?> data() {
        System.out.println("데이터");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/test")
    public String test() {
        System.out.println("테스트");
        return "joinForm";
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> rep() {
        System.out.println("리프레쉬 토큰 확인");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/logout2")
    public String access() throws IOException {


        return "redirect:/";
    }


}
