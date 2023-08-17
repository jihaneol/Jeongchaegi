package com.oppas.controller;

import com.oppas.dto.policy.*;
import com.oppas.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @GetMapping
    public ResponseEntity<Page<PolicySummaryDTO>> getPolicies(@ModelAttribute PolicyFilterDTO filter, @RequestParam int pageIndex) throws Exception {
        Page<PolicySummaryDTO> policies = policyService.getPolicies(filter, pageIndex);
        return ResponseEntity.ok(policies);
    }

    @GetMapping("/{policyId}")
    public ResponseEntity<PolicyDetailDTO> getPolicy(@PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(policyService.getPolicy(policyId));
    }

    @GetMapping("/type")
    public ResponseEntity<List<PolicyTypeDTO>> getPolicyTypes() throws Exception {
        return ResponseEntity.ok(policyService.getPolicyTypes());
    }

    @GetMapping("/region")
    public ResponseEntity<List<PolicyRegionDTO>> getPolicyRegions() throws Exception {
        return ResponseEntity.ok(policyService.getPolicyRegions());
    }

}
