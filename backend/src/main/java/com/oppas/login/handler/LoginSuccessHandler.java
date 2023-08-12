package com.oppas.login.handler;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.jwt.JwtService;
import com.oppas.entity.Member;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String username = extractUsername(authentication);
        String accessToken = jwtService.createAccessToken(username);
        Member user = getMember(authentication);
        log.info("accessToken {}",accessToken);
        if (!user.isSign()) {
            // 회원 가입 x
            jwtService.sendAccessToken(response, accessToken);
            response.sendRedirect("http://3.36.131.236/login/signup");
            return;
        }
        // 회원 가입 완료

        String refreshToken = jwtService.createRefreshToken(); // JwtService의 createRefreshToken을 사용하여 RefreshToken 발급
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken, false); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답

        memberRepository.findByName(username)
                .ifPresent(member -> {
                    member.updateRefreshToken(refreshToken);
                    memberRepository.saveAndFlush(member);
                    jwtService.sendkakaoToken(response,member.getKakaoToken());
                });

        response.sendRedirect("http://3.36.131.236/login/success");
    }

    private String extractUsername(Authentication authentication) {
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }

    private Member getMember(Authentication authentication) {
        PrincipalDetails memberDetails = (PrincipalDetails) authentication.getPrincipal();
        return memberDetails.getMember();
    }
}