package com.oppas.service;

import com.oppas.dto.PolicyDTO;
import com.oppas.entity.policy.Policy;
import com.oppas.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final ModelMapper modelMapper;

    public Long savePolicy(PolicyDTO policyDTO) throws Exception {
        Policy policy = policyDTO.createPolicy(modelMapper);

        // 이미 저장된 정책인 경우, 기존 지역 코드를 가져오기
        Optional<Policy> savedPolicy = policyRepository.findById(policy.getId());
        savedPolicy.ifPresent(value -> policy.setSrchPolyBizSecd(value.getSrchPolyBizSecd()));
        
        policyRepository.save(policy);
        return policy.getId();
    }

    public List<Policy> findPolicies() throws Exception {
        return policyRepository.findAll();
    }

    public Policy findPolicy(Long policyId) throws Exception {
        return policyRepository.findById(policyId).orElseThrow(EntityNotFoundException::new);
    }

}
