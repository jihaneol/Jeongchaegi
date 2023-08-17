package com.oppas.service;

import com.oppas.dto.policy.PolicySummaryDTO;
import com.oppas.entity.Member;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyScrap;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.policy.PolicyRepository;
import com.oppas.repository.policy.PolicyScrapRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ScrapService {

    private final MemberRepository memberRepository;
    private final PolicyRepository policyRepository;
    private final PolicyScrapRepository policyScrapRepository;
    private final ModelMapper modelMapper;

    /**
     * 관심있는 정책을 스크랩하여 저장
     */
    public void createPolicyScrap(Long memberId, Long policyId) throws Exception {
        PolicyScrap policyScrap = new PolicyScrap();
        Member member = memberRepository.findById(memberId).orElseThrow(EntityNotFoundException::new);
        Policy policy = policyRepository.findById(policyId).orElseThrow(EntityNotFoundException::new);

        policyScrap.setMember(member);
        policyScrap.setPolicy(policy);
        policyScrap.setTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        policyScrapRepository.save(policyScrap);
    }

    /**
     * 사용자가 스크랩했던 정책 정보들을 반환
     */
    public Page<PolicySummaryDTO> getMyPolicyScraps(Long memberId, int pageIndex) throws Exception {
        List<PolicySummaryDTO> policyPages = new ArrayList<>();
        List<PolicyScrap> policyScraps = policyScrapRepository.findAllByMemberId(memberId);

        for (PolicyScrap policyScrap : policyScraps) {
            Policy policy = policyScrap.getPolicy();
            policyPages.add(modelMapper.map(policy, PolicySummaryDTO.class));
        }

        return new PageImpl<>(policyPages, PageRequest.of(pageIndex - 1, 10), policyPages.size());
    }

    /**
     * 사용자가 스크랩한 정책 수 반환
     */
    public Long getMyScrapCount(Long memberId) throws Exception {
        return policyScrapRepository.countByMemberId(memberId);
    }

    /**
     * 각 정책별로 스크랩 여부를 확인
     */
    public Boolean checkPolicyScrap(Long memberId, Long policyId) throws Exception {
        PolicyScrap policyScrap = policyScrapRepository.findByMemberIdAndPolicyId(memberId, policyId);
        return policyScrap != null;
    }

    /**
     * 스크랩한 정책에 대해 스크랩 취소
     */
    public void cancelPolicyScrap(Long memberId, Long policyId) throws Exception {
        policyScrapRepository.deleteByMemberIdAndPolicyId(memberId, policyId);
    }

}
