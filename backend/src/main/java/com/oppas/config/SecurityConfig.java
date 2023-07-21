package com.oppas.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity //스프링 시큐리티 필터가 스프링 필터체인에 등록이된다.
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig  {

//	@Autowired
//	private PrincipalOauth2UserService principalOauth2UserService;

	//해당 메서드의 리턴 되는 오브젝트를 loc로 등록해준다.
	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests()
				.antMatchers("/user/**").authenticated()
				 .antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
				.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
				.anyRequest().permitAll()
				.and()
				.formLogin()
				.loginPage("/loginForm")
				.loginProcessingUrl("/login") // login 주소가 호출이 되면 시큐리티가 낚아채서 대신 로그인을 진행해 줍니다.
				.defaultSuccessUrl("/");
//				.loginProcessingUrl("/loginProc")
//				.defaultSuccessUrl("/")
//				.and()
//				.oauth2Login()
//				.loginPage("/login")
//				// 1.인증 , 2 토큰, 3 , 사용자 정보 가져오기 4. 그 정보 토대로 자동 진행
//				.userInfoEndpoint()
//				.userService(principalOauth2UserService);

		return http.build();
	}
}
