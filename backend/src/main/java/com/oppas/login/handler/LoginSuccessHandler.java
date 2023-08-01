package com.oppas.login.handler;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.jwt.JwtService;
import com.oppas.model.User;
import com.oppas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.remoting.soap.SoapFaultException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String username = extractUsername(authentication);
        String accessToken = jwtService.createAccessToken(username);
        User user = getUser(authentication);
        if(!user.isSign()){
            // 회원 가입 x
            jwtService.sendAccessToken(response,accessToken);
            response.sendRedirect("http://localhost:3000/login/signup");
            return;
        }

        // 1. 유저정보 넣기
        // 2. 토큰 만들기

        // 인증 정보에서 Username(email) 추출

        String refreshToken = jwtService.createRefreshToken(); // JwtService의 createRefreshToken을 사용하여 RefreshToken 발급
        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken, false); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답


        userRepository.findByName(username)
                .ifPresent(user1 -> {
                    user1.updateRefreshToken(refreshToken);
                    userRepository.saveAndFlush(user1);
                });
        log.info("로그인 됐다....");
        response.sendRedirect("http://localhost:3000/login/success");
    }

    private String extractUsername(Authentication authentication) {
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }

    private User getUser(Authentication authentication) {
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        return userDetails.getUser();
    }
}