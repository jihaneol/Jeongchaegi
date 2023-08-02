package com.oppas.controller;

import com.oppas.entity.policy.Policy;
import com.oppas.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @GetMapping("/policies")
    public ResponseEntity<Page<Policy>> getPolicies(@RequestParam int pageIndex) throws Exception {
        Page<Policy> policyList = policyService.getPolicies(pageIndex);
        return ResponseEntity.ok(policyList);
    }

    @GetMapping("/policies/{policyId}")
    public ResponseEntity<Policy> getPolicy(@PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(policyService.getPolicy(policyId));
    }

}
