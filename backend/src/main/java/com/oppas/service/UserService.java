package com.oppas.service;

import com.oppas.dto.UserSignUpDTO;
import com.oppas.model.User;
import com.oppas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(UserSignUpDTO userSignUpDto) throws Exception {

//        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
//            throw new Exception("이미 존재하는 이메일입니다.");
//        }
//
//        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
//            throw new Exception("이미 존재하는 닉네임입니다.");
//        }

        User user = User.builder()
                .email(userSignUpDto.getEmail())
                .nickname(userSignUpDto.getNickname())
                .age(userSignUpDto.getAge())
                .city(userSignUpDto.getCity())
                .role("ROLE_USER")
                .policyType(userSignUpDto.getPolicyType())
                .build();

//        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }
}