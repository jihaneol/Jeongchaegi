package com.oppas.service;

import com.oppas.dto.PolicyDTO;
import com.oppas.entity.policy.Policy;
import com.oppas.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
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

    public Page<Policy> getPolicies(int pageIndex) throws Exception {
        Pageable pageable = PageRequest.of(pageIndex, 20);
        return policyRepository.findAll(pageable);
    }

    public Policy getPolicy(Long policyId) throws Exception {
        return policyRepository.findById(policyId).orElseThrow(EntityNotFoundException::new);
    }

    public long getPolicyCount() throws Exception {
        return policyRepository.count();
    }

}
