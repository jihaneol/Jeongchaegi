package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.member.FollowInfo;
import com.oppas.dto.member.FollowListDTO;
import com.oppas.dto.member.MemberForm;
import com.oppas.dto.member.MemberResponse;
import com.oppas.entity.member.Member;
import com.oppas.jwt.JwtService;
import com.oppas.repository.MemberRepository;
import com.oppas.service.FollowService;
import com.oppas.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    private final FollowService followService;

    @ExceptionHandler(RuntimeException.class)
    public Object processValidationError(RuntimeException ex) {
        log.info("에러 확인 {}", ex.getStackTrace());
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/info")
    public ResponseEntity<?> info(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long id = principalDetails.getId();
        Member member = memberRepository.findById(id).get();
        return new ResponseEntity<>(new MemberResponse(member), HttpStatus.OK);
    }

    @PutMapping("/{memberId}/edit")
    public ResponseEntity<?> updateMember(@PathVariable("memberId") Long id,
                                          @RequestBody MemberForm memberForm) {
        memberService.updateMember(id, memberForm);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{toMemberId}/follow")
    public ResponseEntity<?> followMember(@PathVariable("toMemberId") Long to,
                                          @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long from = principalDetails.getId();
        if (!followService.follow(to, from)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{toMemberId}/unFollow")
    public ResponseEntity<?> unFollowMember(@PathVariable("toMemberId") Long to,
                                            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long from = principalDetails.getId();
        followService.unFollow(to, from);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/followInfo")
    public ResponseEntity<?> followerInfo(@RequestParam("memberid") Long id) {
        FollowInfo followInfo = followService.Info(id);
        return new ResponseEntity<>(followInfo, HttpStatus.OK);
    }

    @GetMapping("/{toUserId}/check/follow")
    public ResponseEntity<?> checkFollow(@PathVariable("toUserId") Long toId,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long fromId = principalDetails.getId();
        boolean result = followService.checkFollow(toId, fromId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/followerList")
    public ResponseEntity<?> followerList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long id = principalDetails.getId();
        List<FollowListDTO> followListDTOS = followService.getfollowerList(id);
        return new ResponseEntity<>(followListDTOS, HttpStatus.OK);
    }

    @GetMapping("/followeeList")
    public ResponseEntity<?> followeeList(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long id = principalDetails.getId();
        List<FollowListDTO> followListDTOS = followService.getfolloweeList(id);
        return new ResponseEntity<>(followListDTOS, HttpStatus.OK);
    }

    @GetMapping("/search/follower")
    public ResponseEntity<?> searchNicknameFollower(@RequestParam("nickname") String name, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long id = principalDetails.getId();
        List<FollowListDTO> followListDTOS = followService.searchNicknameFollower(name, id);
        return new ResponseEntity<>(followListDTOS, HttpStatus.OK);
    }

    @GetMapping("/search/followee")
    public ResponseEntity<?> searchNicknameFollowee(@RequestParam("nickname") String name, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long id = principalDetails.getId();
        List<FollowListDTO> followListDTOS = followService.searchNicknameFollowee(name, id);
        return new ResponseEntity<>(followListDTOS, HttpStatus.OK);
    }

}