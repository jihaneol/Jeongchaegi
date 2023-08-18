package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.member.MemberSignUpDTO;
import com.oppas.jwt.JwtResponse;
import com.oppas.jwt.JwtService;
import com.oppas.repository.MemberRepository;
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
    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    static String reIssueRefreshToken, accessToken;

    @GetMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {

        jwtService.extractRefreshToken(request)
                .ifPresent(refreshtoken -> memberRepository.findByRefreshToken(refreshtoken)
                        .ifPresent(member -> {
                            reIssueRefreshToken = jwtService.reIssueRefreshToken(member);
                            accessToken = jwtService.createAccessToken(member.getName());
                        })
                );
        JwtResponse jwtResponse = new JwtResponse(reIssueRefreshToken, accessToken);

        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody MemberSignUpDTO memberSignUpDTO,
                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        long id = principalDetails.getId();
        memberService.signUp(memberSignUpDTO, id);

        return new ResponseEntity<>(HttpStatus.OK);
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

    @GetMapping("/check")
    public ResponseEntity<?> checkLogin() {
        return ResponseEntity.ok().build();
    }

}
