package com.oppas.service;

import com.oppas.dto.policy.*;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyDate;
import com.oppas.entity.policy.PolicyRegion;
import com.oppas.entity.policy.PolicyType;
import com.oppas.repository.policy.PolicyDateRepository;
import com.oppas.repository.policy.PolicyRegionRepository;
import com.oppas.repository.policy.PolicyRepository;
import com.oppas.repository.policy.PolicyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
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

}
