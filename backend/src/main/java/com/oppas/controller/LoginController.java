package com.oppas.controller;

import com.oppas.model.User;
import com.oppas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;
//
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping({ "", "/" })
    public @ResponseBody String index() {
        return "인덱스 페이지입니다.";
    }

    @GetMapping("/user")
    public @ResponseBody String user() {
        return "user";
    }
    // 스프링 시큐리티 해당주소를 낚는다 - securityconfig 설정후에 말이다.
//    @GetMapping("/login")
//    public @ResponseBody String login() {
//        return "login";
//    }
    @GetMapping("/loginForm")
    public  String login() {
        return "loginForm";
    }

    @GetMapping("/joinForm")
    public  String joinForm() {
        return "joinForm";
    }

    @PostMapping("/join")
    public  String join(User user) {
        System.out.println(user);
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);
        userRepository.save(user); // 비번 암호화 해줘야 한다.
        return "redirect:/loginForm";
    }

    @GetMapping("/jeongchaegi/user/kakaologin")
    public void kakaoLogin(String code) {

        System.out.println(code);
//         코드를 통해서 카카오토큰 받아오기
//        KakaoToken kakaoToken =  kakaoService.makeToken(code);
//
//
//        // 토큰을 통해서 사용자정보 받아오기
//        KakaoProfile kakaoProfile= kakaoService.makeKakaoProfile(kakaoToken.getAccess_token());
//
//
//        //회원가입 또는 로그인 시키기
//        Member kakaoUser  = memberRepository.findByEmail(kakaoProfile.getKakao_account().getEmail());
//
//        if(kakaoUser==null){ // 신규가입 시키기
//            kakaoUser = MemberDto.createMemberDto(kakaoProfile.getKakao_account().getEmail(),kakaoProfile.getProperties().getNickname());
//            memberRepository.save(kakaoUser);
//        }
//        else{ // 로그인 시키기
//            System.out.println("로그인 시키기");
//        }

    }

//    @GetMapping("/user")
//    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principal) {
//        System.out.println("Principal : " + principal);
//        System.out.println("OAuth2 : "+principal.getUser().getProvider());
//        // iterator 순차 출력 해보기
//        Iterator<? extends GrantedAuthority> iter = principal.getAuthorities().iterator();
//        while (iter.hasNext()) {
//            GrantedAuthority auth = iter.next();
//            System.out.println(auth.getAuthority());
//        }
//
//        return "유저 페이지입니다.";
//    }
//
//    @GetMapping("/admin")
//    public @ResponseBody String admin() {
//        return "어드민 페이지입니다.";
//    }
//
//    //@PostAuthorize("hasRole('ROLE_MANAGER')")
//    //@PreAuthorize("hasRole('ROLE_MANAGER')")
//    @Secured("ROLE_MANAGER")
//    @GetMapping("/manager")
//    public @ResponseBody String manager() {
//        return "매니저 페이지입니다.";
//    }
//
//    @GetMapping("/login")
//    public String login() {
//        return "login";
//    }
//
//    @GetMapping("/join")
//    public String join() {
//        return "join";
//    }
//
//    @PostMapping("/joinProc")
//    public String joinProc(User user) {
//        System.out.println("회원가입 진행 : " + user);
//        String rawPassword = user.getPassword();
//        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//        user.setPassword(encPassword);
//        user.setRole("ROLE_USER");
//        userRepository.save(user);
//        return "redirect:/";
//    }
}
