package com.oppas.service;

import com.oppas.dto.member.MemberForm;
import com.oppas.dto.member.MemberSignUpDTO;
import com.oppas.entity.Member;
import com.oppas.entity.PolicyMemberMapped;
import com.oppas.entity.policy.PolicyType;
import com.oppas.repository.FollowRepository;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.PolicyMemberMappedRepository;
import com.oppas.repository.policy.PolicyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PolicyMemberMappedRepository policyMemberMappedRepository;
    private final PolicyTypeRepository policyTypeRepository;
    private final FollowRepository followRepository;

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
    }

    public boolean findNickName(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);

        if (member.isEmpty()) {
            // 유일 하다면
            return true;
        } else {
            // 유일 하지 않으면
            return false;
        }

    }

    @Transactional
    public Member updateMember(Long id, MemberForm memberForm) {
        Member member = memberRepository.findById(id).get();
        member.getPolicyMemberMappeds().clear();
        member.setCity(memberForm.getCity());

        for (String policyId :memberForm.getPolicyId()) {
            PolicyType findType = policyTypeRepository.findById(policyId).orElseThrow();
            PolicyMemberMapped build = PolicyMemberMapped.builder()
                    .time(LocalDateTime.now())
                    .policyType(findType)
                    .member(member)
                    .build();
             member.getPolicyMemberMappeds().add(build);
        }
        return member;
    }


}