package com.oppas.jwt;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 시큐리티가 필터 가지고 있는데 그 필터중에 basicauthenticationfilter 라는것이 있음
 * 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 탄다
 * 만약에 권한이 인증이 필요한 주소가 아니라면 이 필터를 안타요
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증이나 권한이 필요한 주소 요청이됨");
        String jwtheader = request.getHeader("Authorization");
        System.out.println("jwtheader : "+jwtheader);
    }
}
