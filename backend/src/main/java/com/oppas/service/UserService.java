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

    public void signUp(UserSignUpDTO userSignUpDto)  {
        System.out.println("andskfj");
        System.out.println(userSignUpDto.getUsername());
       User user  = userRepository.findByName(userSignUpDto.getUsername()).get();

        User user1 = user.builder()
                .email(userSignUpDto.getEmail())
                .nickname(userSignUpDto.getNickname())
                .age(userSignUpDto.getAge())
                .city(userSignUpDto.getCity())
                .policyType(userSignUpDto.getPolicyType())
                .sign(true)
                .build();

        userRepository.save(user1);
    }
}