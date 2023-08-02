package com.oppas.service;

import com.oppas.dto.UserSignUpDTO;
import com.oppas.model.User;
import com.oppas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    public void signUp(UserSignUpDTO userSignUpDto)  {
        System.out.println("andskfj");
        System.out.println(userSignUpDto.getName());
        User user  = userRepository.findByName(userSignUpDto.getName()).get();
        System.out.println(user.getProviderId());
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.map(userSignUpDto, user);
        System.out.println(user.getCity());
        user.updateJoin(true);

        userRepository.save(user);
    }
}