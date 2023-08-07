package com.oppas.controller;

import com.oppas.dto.*;
import com.oppas.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @GetMapping("/policies")
    public ResponseEntity<Page<PolicySummaryDTO>> getPolicies(@ModelAttribute PolicyFilterDTO filter, @RequestParam int pageIndex) throws Exception {
        Page<PolicySummaryDTO> policies = policyService.getPolicies(filter, pageIndex);
        return ResponseEntity.ok(policies);
    }

    @GetMapping("/policies/{policyId}")
    public ResponseEntity<PolicyDetailDTO> getPolicy(@PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(policyService.getPolicy(policyId));
    }

    @GetMapping("/policies/type")
    public ResponseEntity<List<PolicyTypeDTO>> getPolicyTypes() throws Exception {
        return ResponseEntity.ok(policyService.getPolicyTypes());
    }

    @GetMapping("/policies/region")
    public ResponseEntity<List<PolicyRegionDTO>> getPolicyRegions() throws Exception {
        return ResponseEntity.ok(policyService.getPolicyRegions());
    }

    @PostMapping("/policies/scrap")
    public ResponseEntity<PolicyScrapDTO> createPolicyScrap(@RequestBody PolicyScrapDTO policyScrapDTO) throws Exception {
        policyService.createPolicyScrap(policyScrapDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(policyScrapDTO);
    }

    @GetMapping("/policies/scrap/{memberId}")
    public ResponseEntity<Page<PolicySummaryDTO>> getMyPolicyScraps(@PathVariable Long memberId, @RequestParam int pageIndex) throws Exception {
        return ResponseEntity.ok(policyService.getMyPolicyScraps(memberId, pageIndex));
    }

    @GetMapping("/policies/scrap")
    public ResponseEntity<Boolean> checkPolicyScrap(@ModelAttribute PolicyScrapDTO policyScrapDTO) throws Exception {
        return ResponseEntity.ok(policyService.checkPolicyScrap(policyScrapDTO));
    }

    @DeleteMapping("/policies/scrap")
    public ResponseEntity<?> cancelPolicyScrap(@RequestParam Long policyScrapId) throws Exception {
        policyService.cancelPolicyScrap(policyScrapId);
        return ResponseEntity.noContent().build();
    }

}
