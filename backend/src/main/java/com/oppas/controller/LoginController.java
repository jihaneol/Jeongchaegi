package com.oppas.controller;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.oppas.config.auth.PrincipalDetails;
import com.oppas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 스프링 시큐리티
 * 시큐리티 세션
 * Authentication -> DI -> userDetails(일반 로그인),OAuth2user(카카오 등 로그인)
 *
 */

@Controller
public class LoginController {



    // jwt

    @GetMapping("/data")
    public  ResponseEntity<?>  data() {

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/refresh-token")
    public  ResponseEntity<?>  rep() {

        return new ResponseEntity(HttpStatus.OK);
    }



}
