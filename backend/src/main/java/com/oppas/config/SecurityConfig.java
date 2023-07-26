package com.oppas.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.oppas.config.auth.AuthorizationRequestRepository;
import com.oppas.config.auth.PrincipalDetailsService;
import com.oppas.config.oauth.PrincipalOauth2UserService;
import com.oppas.jwt.JwtAuthenticationProcessingFilter;
import com.oppas.jwt.JwtService;
import com.oppas.login.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.oppas.login.handler.LoginFailureHandler;
import com.oppas.login.handler.LoginSuccessHandler;
import com.oppas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity //스프링 시큐리티 필터가 스프링 필터체인에 등록이된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) //secured 어노테이션 활성화 , preAuthorize활성화
@RequiredArgsConstructor
public class SecurityConfig  {

	private final AuthorizationRequestRepository authorizationRequestRepository;
	private final JwtService jwtService;
	private final UserRepository userRepository;
	private final ObjectMapper objectMapper;
	private final PrincipalOauth2UserService principalOauth2UserService;
	private final PrincipalDetailsService principalDetailsService;

	@Autowired
	private CorsFilter corsFilter;
//	@Autowired


	//해당 메서드의 리턴 되는 오브젝트를 loc로 등록해준다.
	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}


	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
		http.csrf().disable();
		http
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.addFilter(corsFilter)
				.formLogin().disable()
				.httpBasic().disable()
				.authorizeRequests()
				.antMatchers("/api/v1/user/**")
				.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
						.anyRequest().permitAll();


		http.oauth2Login() //카카오 로그인 오쓰요
				.userInfoEndpoint()
				.userService(principalOauth2UserService)
				.and()
				.successHandler(loginSuccessHandler())
				.failureHandler(loginFailureHandler());
////				// 1.인증 , 2 토큰, 3 , 사용자 정보 가져오기 4. 그 정보 토대로 로그인 자동 진행

//		http.addFilter(new JwtAuthenticationFilter(authenticationManager));
//				// AuthenticationManger 떤져
//		http.addFilter(new JwtAuthorizationFilter(authenticationManager));
//		http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
		http.addFilterAfter(jwtAuthenticationProcessingFilter(), LogoutFilter.class);

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
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	/**
	 * AuthenticationManager 설정 후 등록
	 * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
	 * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
	 * UserDetailsService는 커스텀 principalDetailsService 등록
	 * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
	 *
	 */
	@Bean
	public AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder());
		provider.setUserDetailsService(principalDetailsService);
		return new ProviderManager(provider);
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

	/**
	 * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
	 * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
	 * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
	 * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
	 */
	@Bean
	public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
		CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
				= new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
		customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
		customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
		customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
		return customJsonUsernamePasswordLoginFilter;
	}

	@Bean
	public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
		System.out.println("jwt 필터 작동 ~~~~~~~~~~~~~~~~");
		JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService, userRepository);
		return jwtAuthenticationFilter;
	}

}
