package com.oppas.controller;

import com.oppas.entity.Policy;
import com.oppas.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @GetMapping("/policies")
    public ResponseEntity<List<Policy>> getPolicies() throws Exception {
        return ResponseEntity.ok(policyService.findPolicies());
    }

    @GetMapping("/policies/{policyId}")
    public ResponseEntity<Policy> getPolicy(@PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(policyService.findPolicy(policyId));
    }

}
