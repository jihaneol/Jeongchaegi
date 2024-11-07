package com.oppas.login.handler;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.entity.member.Member;
import com.oppas.jwt.JwtProvider;
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

    private final JwtProvider jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        Member user = getMember(authentication);
        String accessToken = jwtService.createAccessToken(user.getName());

        // 회원 가입 안했다면.
        if (!user.isSign()) {
            jwtService.sendAccessToken(response, accessToken);
            response.sendRedirect("http://www.jeongchaegi.com/login/signup");
            return;
        }

        // 로그인 처리
        String refreshToken = jwtService.createRefreshToken(); // JwtService의 createRefreshToken을 사용하여 RefreshToken 발급
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken, false); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답

        user.updateRefreshToken(refreshToken);
        memberRepository.save(user);
        jwtService.sendkakaoToken(response, user.getKakaoToken());

        response.sendRedirect("http://www.jeongchaegi.com/login/success");
    }

    private Member getMember(Authentication authentication) {
        PrincipalDetails memberDetails = (PrincipalDetails) authentication.getPrincipal();
        return memberDetails.getMember();
    }
}