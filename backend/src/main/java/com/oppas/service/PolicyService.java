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

    public Long savePolicy(PolicyDTO policyDTO) throws Exception {
        Policy policy = modelMapper.map(policyDTO, Policy.class);
        System.out.println(policy);
        policyRepository.save(policy);
        return policy.getId();
    }

}
