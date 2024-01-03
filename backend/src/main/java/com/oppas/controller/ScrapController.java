package com.oppas.controller;

import com.oppas.dto.policy.HotPolicyDTO;
import com.oppas.dto.policy.PolicyScrapDTO;
import com.oppas.dto.policy.PolicySummaryDTO;
import com.oppas.service.ScrapService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scraps")
@RequiredArgsConstructor
public class ScrapController {

    private final ScrapService scrapService;

    @PostMapping("/scrap/members/{memberId}/policies/{policyId}")
    public ResponseEntity<PolicyScrapDTO> createPolicyScrap(@PathVariable Long memberId,
                                                            @PathVariable Long policyId) throws Exception {
        scrapService.createPolicyScrap(memberId, policyId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/my-scrap/members/{memberId}")
    public ResponseEntity<Page<PolicySummaryDTO>> getMyPolicyScraps(@PathVariable Long memberId,
                                                                    @RequestParam int pageIndex) throws Exception {
        return ResponseEntity.ok(scrapService.getMyPolicyScraps(memberId, pageIndex));
    }

    @GetMapping("/count/members/{memberId}")
    public ResponseEntity<Long> getMyScrapCount(@PathVariable Long memberId) throws Exception {
        return ResponseEntity.ok(scrapService.getMyScrapCount(memberId));
    }

    @GetMapping("/check/members/{memberId}/policies/{policyId}")
    public ResponseEntity<Boolean> checkPolicyScrap(@PathVariable Long memberId,
                                                    @PathVariable Long policyId) throws Exception {
        return ResponseEntity.ok(scrapService.checkPolicyScrap(memberId, policyId));
    }

    @DeleteMapping("/cancel/members/{memberId}/policies/{policyId}")
    public ResponseEntity<?> cancelPolicyScrap(@PathVariable Long memberId,
                                               @PathVariable Long policyId) throws Exception {
        scrapService.cancelPolicyScrap(memberId, policyId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/hot")
    public ResponseEntity<?> hotPolicyScrap() {
        System.out.println(123);
        List<HotPolicyDTO> list = scrapService.getMostScrappedPolicies();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}
