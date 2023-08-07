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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.logging.SocketHandler;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PolicyMemberMappedRepository policyMemberMappedRepository;
    private final PolicyTypeRepository policyTypeRepository;

    @Transactional
    public void signUp(MemberSignUpDTO memberSignUpDTO,long id) {
        Member member = memberRepository.findById(id).get();
        member.join(memberSignUpDTO);
        for(String policyId: memberSignUpDTO.getPolicyId()){
            // Type 찾기
            PolicyType findType = policyTypeRepository.findById(policyId).orElseThrow();
            // PolicyMemberMapped 생성자?
            PolicyMemberMapped mapped = PolicyMemberMapped.builder()
                    .policyType(findType)
                    .member(member)
                    .time(LocalDateTime.now()).build();
            // member에 값 저장
            member.getPolicyMemberMappeds().add(mapped);
        }
        member.updateJoin(true);
//        this.memberRepository.save(member);
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