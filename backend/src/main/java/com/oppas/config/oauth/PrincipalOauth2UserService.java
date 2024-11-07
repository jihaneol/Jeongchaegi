package com.oppas.config.oauth;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.config.oauth.provider.KakaoUserInfo;
import com.oppas.config.oauth.provider.OAuth2UserInfo;
import com.oppas.entity.member.Member;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest); // 소셜 로그인의 회원 프로필 조회

        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        OAuth2UserInfo oAuth2UserInfo = getUserInfo(userRequest, oAuth2User);

        Optional<Member> userOptional = memberRepository.findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());

        Member member = getMember(userOptional, oAuth2UserInfo, oAuth2User);

        member.setKakaoToken(userRequest.getAccessToken().getTokenValue());

        memberRepository.save(member);

        return new PrincipalDetails(member, oAuth2User.getAttributes());
    }

    private OAuth2UserInfo getUserInfo(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            return new KakaoUserInfo(oAuth2User.getAttributes());
        }

        throw new IllegalArgumentException("카카오 로그인만 가능합니다.");
    }

    private Member getMember(Optional<Member> userOptional, OAuth2UserInfo oAuth2UserInfo, OAuth2User oAuth2User) {
        if (userOptional.isPresent()) return userOptional.get();

        return Member.builder()
                .name(oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getProviderId())
                .email(oAuth2UserInfo.getEmail())
                .role("ROLE_USER")
                .provider(oAuth2UserInfo.getProvider())
                .providerId(oAuth2UserInfo.getProviderId())
                .sign(false)
                .img((String) ((Map) oAuth2User.getAttributes().get("properties")).get("thumbnail_image"))
                .build();
    }
}
