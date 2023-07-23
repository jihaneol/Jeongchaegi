package com.oppas.config;


import com.oppas.config.oauth.PrincipalOauth2UserService;
import com.oppas.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.Filter;

@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity //스프링 시큐리티 필터가 스프링 필터체인에 등록이된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) //secured 어노테이션 활성화 , preAuthorize활성화

public class SecurityConfig  {
	@Autowired
	private CorsFilter corsFilter;
	@Autowired
	private PrincipalOauth2UserService principalOauth2UserService;


	//해당 메서드의 리턴 되는 오브젝트를 loc로 등록해준다.
	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}


	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilter(corsFilter)
				.formLogin().disable()
				.httpBasic().disable()
				.addFilter(new JwtAuthenticationFilter(authenticationManager)) // AuthenticationManger 떤져
				.authorizeRequests()
				.antMatchers("/api/v1/user/**")
				.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
				.anyRequest().permitAll();
		return http.build();
	}

	//	@Bean
//	@Order(1)
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		System.out.println("111111111111111111");
//		http.csrf().disable();
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);// 세션 사용 안한다.
//
//		http.authorizeRequests()
//				.antMatchers("/user/**").authenticated()
//				 .antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
//				.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
//				.anyRequest().permitAll()
//				.and()
//				.formLogin()
//				.loginPage("/loginForm")
//				.loginProcessingUrl("/login") // login 주소가 호출이 되면 시큐리티가 낚아채서 대신 로그인을 진행해 줍니다.
//				.defaultSuccessUrl("/")
////				.loginProcessingUrl("/loginProc")
////				.defaultSuccessUrl("/")
//				.and()
//				.oauth2Login() //카카오 로그인 오쓰요
//				.loginPage("/") //로그인 완료된 뒤 후처리 필요
////				// 1.인증 , 2 토큰, 3 , 사용자 정보 가져오기 4. 그 정보 토대로 로그인 자동 진행
//				.userInfoEndpoint()
//				.userService(principalOauth2UserService);// 후처리용
//
//		return http.build();
//	}
//	@Bean
//	public SecurityFilterChain filterChain2(HttpSecurity http) throws Exception {
//		http.csrf().disable();
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//				.and()
//				.addFilter(corsFilter)
//				.formLogin().disable()
//				.httpBasic().disable()
//				.addFilter(new JwtAuthenticationFilter()) // AuthenticationManger 떤져
//				.authorizeRequests()
//				.antMatchers("/api/v1/user/**")
//				.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//				.anyRequest().permitAll();
//		return http.build();
//
//
//	}

}
