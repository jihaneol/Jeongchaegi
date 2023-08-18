package com.oppas.config;


import com.oppas.config.oauth.PrincipalOauth2UserService;
import com.oppas.jwt.JwtAuthenticationProcessingFilter;
import com.oppas.jwt.JwtService;
import com.oppas.login.handler.LoginFailureHandler;
import com.oppas.login.handler.LoginSuccessHandler;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity //스프링 시큐리티 필터가 스프링 필터체인에 등록이된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) //secured 어노테이션 활성화 , preAuthorize활성화
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final PrincipalOauth2UserService principalOauth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        /**
         * 인증 인가 기능
         */
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/api/members/**").authenticated()
                .antMatchers(HttpMethod.DELETE, "/api/members/**", "/api/posts/*").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/members/**", "/api/posts", "/api/members/{memberId}/edit").authenticated()
                .antMatchers(HttpMethod.POST, "/api/members/**", "/api/posts").authenticated()
                .anyRequest().permitAll();

        /**
         * 예외 처리 기능 작동
         */
        http.exceptionHandling()
                .authenticationEntryPoint(new AuthenticationEntryPoint() {
                    @Override
                    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                        log.info("인증 실패시 {}", request.getRequestURI());
                        response.setStatus(403);
                    }
                })
                .accessDeniedHandler(new AccessDeniedHandler() {

                    @Override
                    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                        log.info("인가 실패시 {}", request.getRequestURI());
                        response.setStatus(403);
                    }
                });

        /**
         * 소셜 로그인
         */
        http
                .oauth2Login()
                .userInfoEndpoint()
                .userService(principalOauth2UserService)
                .and()
                .successHandler(loginSuccessHandler())
                .failureHandler(loginFailureHandler());

        /**
         * jwt 필터 기능
         */
        http.addFilter(new JwtAuthenticationProcessingFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)), jwtService, memberRepository));

        return http.build();
    }

    /**
     * 소셜 로그인
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
     */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, memberRepository);
    }

    /**
     * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
     */
    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }
}