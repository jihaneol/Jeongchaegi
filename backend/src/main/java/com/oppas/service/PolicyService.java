package com.oppas.service;

import com.oppas.dto.PolicyDTO;
import com.oppas.dto.PolicyFilterDTO;
import com.oppas.dto.PolicyScrapDTO;
import com.oppas.entity.Member;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyRegion;
import com.oppas.entity.policy.PolicyScrap;
import com.oppas.entity.policy.PolicyType;
import com.oppas.repository.MemberRepository;
import com.oppas.repository.policy.PolicyRegionRepository;
import com.oppas.repository.policy.PolicyRepository;
import com.oppas.repository.policy.PolicyScrapRepository;
import com.oppas.repository.policy.PolicyTypeRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
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

@Service
@Transactional
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final PolicyTypeRepository policyTypeRepository;
    private final PolicyRegionRepository policyRegionRepository;
    private final PolicyScrapRepository policyScrapRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    public Long savePolicy(PolicyDTO policyDTO) throws Exception {
        Policy policy = policyDTO.createPolicy(modelMapper);

        // 이미 저장된 정책인 경우, 기존 지역 코드를 가져오기
        Optional<Policy> savedPolicy = policyRepository.findById(policy.getId());
        savedPolicy.ifPresent(value -> policy.setSrchPolyBizSecd(value.getSrchPolyBizSecd()));

        policyRepository.save(policy);
        return policy.getId();
    }

    public Page<Policy> getPolicies(PolicyFilterDTO filter, int pageIndex) throws Exception {
        Pageable pageable = PageRequest.of(pageIndex - 1, 20);
        return policyRepository.findPolicies(filter, pageable);
    }

    public Policy getPolicy(Long policyId) throws Exception {
        return policyRepository.findById(policyId).orElseThrow(EntityNotFoundException::new);
    }

    public List<PolicyType> getPolicyTypes() throws Exception {
        return policyTypeRepository.findAll();
    }

    public List<PolicyRegion> getPolicyRegions() throws Exception {
        return policyRegionRepository.findAll();
    }

    public PolicyScrap createPolicyScrap(PolicyScrapDTO policyScrapDTO) throws Exception {
        PolicyScrap policyScrap = new PolicyScrap();
        Long memberId = policyScrapDTO.getMemberId();
        Long policyId = policyScrapDTO.getPolicyId();
        Member member = memberRepository.findById(memberId).orElseThrow(EntityNotFoundException::new);
        Policy policy = policyRepository.findById(policyId).orElseThrow(EntityNotFoundException::new);

        policyScrap.setMember(member);
        policyScrap.setPolicy(policy);
        policyScrap.setTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        policyScrapRepository.save(policyScrap);
        return policyScrap;
    }

    public List<Policy> getMyPolicyScraps(Long memberId) throws Exception {
        List<Policy> policies = new ArrayList<>();
        List<PolicyScrap> policyScraps = policyScrapRepository.findAllByMemberId(memberId);

        for (PolicyScrap policyScrap : policyScraps) {
            Policy policy = policyScrap.getPolicy();
            policies.add(policy);
        }

        return policies;
    }

    public Boolean checkPolicyScrap(PolicyScrapDTO policyScrapDTO) throws Exception {
        Long memberId = policyScrapDTO.getMemberId();
        Long policyId = policyScrapDTO.getPolicyId();
        PolicyScrap policyScrap = policyScrapRepository.findByMemberIdAndPolicyId(memberId, policyId);
        return policyScrap != null;
    }

    public void cancelPolicyScrap(Long policyScrapId) throws Exception {
        policyScrapRepository.deleteById(policyScrapId);
    }

}
