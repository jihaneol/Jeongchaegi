package com.oppas.service;

import com.oppas.dto.MemberSignUpDTO;
import com.oppas.entity.Member;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void signUp(MemberSignUpDTO memberSignUpDTO) {
        Member member = this.memberRepository.findByName(memberSignUpDTO.getName()).get();
        member.join(memberSignUpDTO);
        member.updateJoin(true);
        this.memberRepository.save(member);
    }

}