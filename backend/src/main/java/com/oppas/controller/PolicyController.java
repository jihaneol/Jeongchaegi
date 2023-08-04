package com.oppas.controller;

import com.oppas.dto.PolicyFilterDTO;
import com.oppas.dto.PolicyScrapDTO;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.PolicyRegion;
import com.oppas.entity.policy.PolicyScrap;
import com.oppas.entity.policy.PolicyType;
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
    public ResponseEntity<Page<Policy>> getPolicies(@ModelAttribute PolicyFilterDTO filter, @RequestParam int pageIndex) throws Exception {
        Page<Policy> policyList = policyService.getPolicies(filter, pageIndex);
        return ResponseEntity.ok(policyList);
    }

    @GetMapping("/policies/{policyId}")
    public ResponseEntity<Policy> getPolicy(@PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(policyService.getPolicy(policyId));
    }

    @GetMapping("/policies/type")
    public ResponseEntity<List<PolicyType>> getPolicyTypes() throws Exception {
        return ResponseEntity.ok(policyService.getPolicyTypes());
    }

    @GetMapping("/policies/region")
    public ResponseEntity<List<PolicyRegion>> getPolicyRegions() throws Exception {
        return ResponseEntity.ok(policyService.getPolicyRegions());
    }

    @PostMapping("/policies/scrap")
    public ResponseEntity<PolicyScrap> createPolicyScrap(@RequestBody PolicyScrapDTO policyScrapDTO) throws Exception {
        PolicyScrap policyScrap = policyService.createPolicyScrap(policyScrapDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(policyScrap);
    }

    @GetMapping("/policies/scrap/{memberId}")
    public ResponseEntity<List<Policy>> getMyPolicyScraps(@PathVariable Long memberId) throws Exception {
        return ResponseEntity.ok(policyService.getMyPolicyScraps(memberId));
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
