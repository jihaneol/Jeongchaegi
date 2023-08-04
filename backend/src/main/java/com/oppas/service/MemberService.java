package com.oppas.service;

import com.oppas.dto.MemberSignUpDTO;
import com.oppas.entity.Member;
import com.oppas.entity.PolicyMemberMapped;
import com.oppas.entity.policy.PolicyType;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.PolicyMemberMappedRepository;
import com.oppas.repository.policy.PolicyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.logging.SocketHandler;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PolicyMemberMappedRepository policyMemberMappedRepository;
    private final PolicyTypeRepository policyTypeRepository;

//    public void

    public void signUp(MemberSignUpDTO memberSignUpDTO,Member member) {
        System.out.println("adsfdfa");
        member.join(memberSignUpDTO);
        for(String type: memberSignUpDTO.getPolicyTypes()){
            System.out.println(type);
            PolicyType findType = policyTypeRepository.findById(type).orElseThrow();
            PolicyMemberMapped Mapped = PolicyMemberMapped.builder()
                    .policyType(findType)
                    .member(member)
                    .time(LocalDateTime.now()).build();
            policyMemberMappedRepository.save(Mapped);
        }
        member.updateJoin(true);
        this.memberRepository.save(member);
    }

    public boolean findNickName(String nickName) {
        Optional<Member> member = memberRepository.findByNickname(nickName);

        if (member.isEmpty()) {
            // 유일 하다면
            return true;
        } else {
            // 유일 하지 않으면
            return false;
        }

    }


}