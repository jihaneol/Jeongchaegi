package com.oppas.service;

import com.oppas.dto.UserSignUpDTO;
import com.oppas.entity.Member;
import com.oppas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    public void signUp(UserSignUpDTO userSignUpDto)  {
        System.out.println("andskfj");

        Member user  = userRepository.findByName(userSignUpDto.getName()).get();

        user.join(userSignUpDto);


        user.updateJoin(true);

        userRepository.save(user);
    }
}