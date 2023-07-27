package com.oppas.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oppas.config.auth.PrincipalDetails;
import com.oppas.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 스프링 시큐리티에 있다
// 로그인 요청해서 id,pw 전송하면
// 동작함
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    // login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("로그인 시도중");
    //1 id,pw 받기
        try {
//            BufferedReader br = request.getReader();
//
//            String input = null;
//            while ((input=br.readLine())!=null){
//                System.out.println(input);
//            }
            ObjectMapper om = new ObjectMapper();
            User user = om.readValue(request.getInputStream(),User.class);
            System.out.println(user);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        //2 authenticationManger로 로그인 시도
    //3 principalDetails 세션 담기(권한 관리 위해서)
    //4 jwt토큰 만들어서 응답해주기
        return super.attemptAuthentication(request, response);
    }

    // attemptAuthentication 정상 실행 되면 실행  된다.

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("성공 했으 ======================");
        PrincipalDetails principalDetails =(PrincipalDetails)authResult.getPrincipal();
        // jwt 토큰 만들기
        super.successfulAuthentication(request, response, chain, authResult);
    }
}
