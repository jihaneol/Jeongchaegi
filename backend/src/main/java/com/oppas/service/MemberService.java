package com.oppas.service;

import com.oppas.dto.member.MemberForm;
import com.oppas.dto.member.MemberResponse;
import com.oppas.dto.member.MemberSignUpDTO;
import com.oppas.entity.member.Member;
import com.oppas.entity.member.PolicyMemberMapped;
import com.oppas.entity.policy.PolicyType;
import com.oppas.repository.FollowRepository;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.PolicyMemberMappedRepository;
import com.oppas.repository.policy.PolicyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PolicyTypeRepository policyTypeRepository;
    private final PolicyMemberMappedRepository policyMemberMappedRepository;

    /*
     * 회원 가입
     */
    @Transactional
    public void signUp(MemberSignUpDTO memberSignUpDTO, long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("회원이 없습니다."));
        member.join(memberSignUpDTO);

        policyMemberMappedRepository.saveAll(memberSignUpDTO.getPolicyId()
                .stream()
                .map(policyId -> {
                    PolicyType findType = policyTypeRepository.findById(policyId).orElseThrow(() ->new IllegalArgumentException("정책 없습니다."));
                    return PolicyMemberMapped.builder()
                            .policyType(findType)
                            .member(member)
                            .time(LocalDateTime.now()).build();
                })
                .collect(Collectors.toList()));

        member.updateJoin(true);
    }

    /**
     * 닉네임 중복 검사
     */

    public boolean findNickName(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        return member.isEmpty()?  true : false;
    }

    /**
     * 회원 정보 수정
     */

    @Transactional
    public Member updateMember(Long id, MemberForm memberForm) {
        Member member = memberRepository.findById(id).get();
        member.getPolicyMemberMappeds().clear();
        member.setCity(memberForm.getCity());

        for (String policyId : memberForm.getPolicyId()) {
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

    public MemberResponse getMemberInfo(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(()
        -> new IllegalArgumentException("회원 정보가 없습니다."));

        return new MemberResponse(member);
    }
}