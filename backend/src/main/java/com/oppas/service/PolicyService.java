package com.oppas.service;

import com.oppas.dto.PolicyDTO;
import com.oppas.entity.Policy;
import com.oppas.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final ModelMapper modelMapper;

    public Long savePolicy(PolicyDTO policyDTO) {
        if (policyRepository.findByBizId(policyDTO.getBizId()) == null) {
            Policy policy = policyDTO.createPolicy(modelMapper);
            policyRepository.save(policy);
            return policy.getId();
        }
        return null;
    }
}
