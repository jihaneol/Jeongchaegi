package com.oppas.config.oauth;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.config.oauth.provider.KakaoUserInfo;
import com.oppas.config.oauth.provider.OAuth2UserInfo;
import com.oppas.model.User;
import com.oppas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class  PrincipalOauth2UserService extends DefaultOAuth2UserService {

	@Autowired
	private UserRepository userRepository;

//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder;

	// userRequest 는 code를 받아서 accessToken을 응답 받은 객체
//함수 종료시 @AuthenticationPrincipal 어노테이션이 만들어진다.
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest); // 카카오의 회원 프로필 조회

		// code를 통해 구성한 정보
		System.out.println("userRequest clientRegistration : " + userRequest.getClientRegistration()); // 어떤오쓰로 로그인한지 확인
		// token을 통해 응답받은 회원정보
		System.out.println("oAuth2User : " + oAuth2User);
		// 회원 가입 강제로 진행 카카오 로그인으로


		return processOAuth2User(userRequest, oAuth2User);
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

		// Attribute를 파싱해서 공통 객체로 묶는다. 관리가 편함.
		OAuth2UserInfo oAuth2UserInfo = null;
		if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
			System.out.println("카카오 로그인 요청~~");
			oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
		}
		else if(userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
				System.out.println("naver 로그인 요청~~");
				oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
		}else{
			System.out.println("카카오만 취급한다.");
		}
		Optional<User> userOptional =
				userRepository.findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());
		User user;
		if (userOptional.isPresent()) {
			System.out.println("이미 가입 했다");
			user = userOptional.get();
			// user가 존재하면 update 해주기
			userRepository.save(user);
		} else {
			System.out.println("가입 해줄게");
			// user의 패스워드가 null이기 때문에 OAuth 유저는 일반적인 로그인을 할 수 없음.
			user = User.builder()
					.username(oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getProviderId())
					.email(oAuth2UserInfo.getEmail())
					.role("ROLE_USER")
					.provider(oAuth2UserInfo.getProvider())
					.providerId(oAuth2UserInfo.getProviderId())
					.build();
			userRepository.save(user);
		}

		return new PrincipalDetails(user, oAuth2User.getAttributes());
	}
}
