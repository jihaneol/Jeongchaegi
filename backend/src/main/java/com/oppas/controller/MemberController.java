package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.member.MemberForm;
import com.oppas.dto.member.MemberResponse;
import com.oppas.dto.member.MemberSignUpDTO;
import com.oppas.entity.Member;
import com.oppas.jwt.JwtResponse;
import com.oppas.jwt.JwtService;
import com.oppas.repository.MemberRepository;
import com.oppas.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    private final MemberRepository memberRepository;
    private final JwtService jwtService;

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
    public ResponseEntity<?> refreshToekn(HttpServletRequest request) {
        Member member = memberRepository.findByRefreshToken(jwtService.extractRefreshToken(request).get()).get();
        String reIssueRefreshToken = jwtService.reIssueRefreshToken(member);
        String accessToken = jwtService.createAccessToken(member.getName());
        JwtResponse jwtResponse = new JwtResponse(reIssueRefreshToken,accessToken,member.getKakaoToken());

        return new ResponseEntity<>(jwtResponse,HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout() {
        log.info("로그 아웃 완료");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody MemberSignUpDTO memberSignUpDTO, Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        long id = principalDetails.getId();
        memberService.signUp(memberSignUpDTO, id);
        log.info("회원가입 성공");
        // 리다이렉트

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 회원 정보 전달
    @GetMapping("/info")
    public ResponseEntity<?> info(Authentication authentication) {
        log.info("회원 정보 전달 하기");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Long id = principalDetails.getId();
        Member member = memberRepository.findMember(id);

        return new ResponseEntity<>(new MemberResponse(member),HttpStatus.OK);
    }

    // 회원 정보 수정
    @PutMapping("/{memberId}/edit")
    public ResponseEntity<?>  updateMember(@PathVariable("memberId") Long id, @RequestBody MemberForm memberForm) {
        memberService.updateMember(id, memberForm);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
