package com.oppas.config;


import com.oppas.config.oauth.PrincipalOauth2UserService;
import com.oppas.jwt.JwtAuthenticationProcessingFilter;
import com.oppas.jwt.JwtService;
import com.oppas.login.handler.LoginFailureHandler;
import com.oppas.login.handler.LoginSuccessHandler;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity //스프링 시큐리티 필터가 스프링 필터체인에 등록이된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) //secured 어노테이션 활성화 , preAuthorize활성화
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtService jwtService;
    private final MemberRepository userRepository;
    private final PrincipalOauth2UserService principalOauth2UserService;


    //해당 메서드의 리턴 되는 오브젝트를 loc로 등록해준다.
    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf().disable();


        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
//				.addFilter(corsFilter)
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
//                .antMatchers("/data").authenticated()
                .antMatchers("/api/v1/user/**").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.POST, "/refresh-token").authenticated()
                .antMatchers(HttpMethod.DELETE, "member/logout").authenticated()
                .anyRequest().permitAll();


        http
                .oauth2Login() //오 로그인 오쓰
                .userInfoEndpoint()
                .userService(principalOauth2UserService)
                .and()
                .successHandler(loginSuccessHandler())
                .failureHandler(loginFailureHandler());

        http.addFilter(new JwtAuthenticationProcessingFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)), jwtService, userRepository));

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    /**
     * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
     */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, userRepository);
    }

    /**
     * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
     */
    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }


}
