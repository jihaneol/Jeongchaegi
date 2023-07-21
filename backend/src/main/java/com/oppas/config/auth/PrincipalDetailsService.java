package com.oppas.config.auth;

import com.oppas.model.User;
import com.oppas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 시큐리티 설정에서 loginProcessingUrl();
 로그인 요청이 오면 자동으로 userDetailsService타입으로 loc되어 있는 loadUserByUsername함수가 실행
 **/
@Service
public class PrincipalDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;

    // 시큐리티 session(내부 Authentication(내부 UserDetails))
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userEntity = userRepository.findByUsername(username);
		if(userEntity == null) {
			return null;
		}else {
			return new PrincipalDetails(userEntity);
		}

	}

}
