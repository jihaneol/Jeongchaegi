package com.oppas.login.handler;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.jwt.JwtService;
import com.oppas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        log.info("토큰생성");
        String email = extractUsername(authentication); // 인증 정보에서 Username(email) 추출
        String accessToken = jwtService.createAccessToken(email); // JwtService의 createAccessToken을 사용하여 AccessToken 발급
        String refreshToken = jwtService.createRefreshToken(); // JwtService의 createRefreshToken을 사용하여 RefreshToken 발급

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답

        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    user.updateRefreshToken(refreshToken);
                    userRepository.saveAndFlush(user);
                });

        response.sendRedirect("http://localhost:3000");
    }

    private String extractUsername(Authentication authentication) {
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        return userDetails.getEmail();
    }
}