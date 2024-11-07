package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.member.MemberSignUpDTO;
import com.oppas.jwt.JwtResponse;
import com.oppas.jwt.JwtProvider;
import com.oppas.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
@Slf4j
public class LoginController {

    private final MemberService memberService;
    private final JwtProvider jwtService;

    @GetMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        JwtResponse jwtResponse = jwtService.getrefreshTokenResponse(request);
        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @Valid @RequestBody MemberSignUpDTO memberSignUpDTO,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {

        long id = principalDetails.getId();
        memberService.signUp(memberSignUpDTO, id);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @GetMapping("/find/{nickname}")
    public ResponseEntity<?> checkNickName(@PathVariable String nickname) {

        return memberService.findNickName(nickname) ?  ResponseEntity.ok().build() :   ResponseEntity.notFound().build();

    }

}
