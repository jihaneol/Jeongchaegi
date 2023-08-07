package com.oppas.service;

import com.oppas.dto.*;
import com.oppas.entity.Member;
import com.oppas.entity.policy.*;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.policy.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final PolicyDateRepository policyDateRepository;
    private final PolicyTypeRepository policyTypeRepository;
    private final PolicyRegionRepository policyRegionRepository;
    private final PolicyScrapRepository policyScrapRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    /**
     * 공공 API에서 데이터를 받아와 정책 정보를 업데이트
     */
    public Long updatePolicies(PolicyApiDTO policyDTO) throws Exception {
        Policy policy = policyDTO.createPolicy(modelMapper);

        // 이미 저장된 정책인 경우, 기존 지역 코드를 가져오기
        Optional<Policy> savedPolicy = policyRepository.findById(policy.getId());
        savedPolicy.ifPresent(value -> policy.setSrchPolyBizSecd(value.getSrchPolyBizSecd()));

        policyRepository.save(policy);
        return policy.getId();
    }

    /**
     * 필터와 페이지 번호를 통해 알맞는 정책 정보들을 반환
     */
    public Page<PolicySummaryDTO> getPolicies(PolicyFilterDTO filter, int pageIndex) throws Exception {
        Pageable pageable = PageRequest.of(pageIndex - 1, 20);
        Page<Policy> policyPages = policyRepository.findPolicies(filter, pageable);
        return policyPages.map(policy -> {
            PolicySummaryDTO policySummary = modelMapper.map(policy, PolicySummaryDTO.class);
            Optional<PolicyDate> policyDate = policyDateRepository.findByPolicyId(policySummary.getId());
            PolicyType policyType = policyTypeRepository.findById(policy.getPolyRlmCd()).orElseThrow(EntityNotFoundException::new);
            PolicyRegion policyRegion = policyRegionRepository.findById(policy.getSrchPolyBizSecd()).orElseThrow(EntityNotFoundException::new);

            if (policyDate.isPresent()) {
                policySummary.setRqutPrdBegin(policyDate.get().getRqutPrdBegin());
                policySummary.setRqutPrdEnd(policyDate.get().getRqutPrdEnd());
            }
            policySummary.setType(policyType.getType());
            policySummary.setRegion(policyRegion.getRegion());
            return policySummary;
        });
    }

    /**
     * 정책 일련번호를 통해 정책 상세 정보를 반환
     */
    public PolicyDetailDTO getPolicy(Long policyId) throws Exception {
        Policy policy = policyRepository.findById(policyId).orElseThrow(EntityNotFoundException::new);
        return modelMapper.map(policy, PolicyDetailDTO.class);
    }

    /**
     * 정책 타입 정보들을 반환
     */
    public List<PolicyTypeDTO> getPolicyTypes() throws Exception {
        return policyTypeRepository.findAll()
                .stream().map(policyType -> modelMapper.map(policyType, PolicyTypeDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * 정책 지역 정보들을 반환
     */
    public List<PolicyRegionDTO> getPolicyRegions() throws Exception {
        return policyRegionRepository.findAll()
                .stream().map(policyRegion -> modelMapper.map(policyRegion, PolicyRegionDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * 관심있는 정책을 스크랩하여 저장
     */
    public void createPolicyScrap(PolicyScrapDTO policyScrapDTO) throws Exception {
        PolicyScrap policyScrap = new PolicyScrap();
        Long memberId = policyScrapDTO.getMemberId();
        Long policyId = policyScrapDTO.getPolicyId();
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

        return new PageImpl<>(policyPages, PageRequest.of(pageIndex - 1, 20), policyPages.size());
    }

    /**
     * 각 정책별로 스크랩 여부를 확인
     */
    public Boolean checkPolicyScrap(PolicyScrapDTO policyScrapDTO) throws Exception {
        Long memberId = policyScrapDTO.getMemberId();
        Long policyId = policyScrapDTO.getPolicyId();
        PolicyScrap policyScrap = policyScrapRepository.findByMemberIdAndPolicyId(memberId, policyId);
        return policyScrap != null;
    }

    /**
     * 스크랩한 정책에 대해 스크랩 취소
     */
    public void cancelPolicyScrap(Long policyScrapId) throws Exception {
        policyScrapRepository.deleteById(policyScrapId);
    }

}
