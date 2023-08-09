package com.oppas.dto.member;

import com.oppas.entity.Member;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
    public class MemberResponse {
        private Long userId;
        private Integer age;
        private String nickname;
        private String city;
        private String img;
        private List<PolicyMemberDTO> policyType;

        public MemberResponse(Member member) {
            userId = member.getId();
            age = member.getAge();
            nickname = member.getNickname();
            city = member.getCity();
            img = member.getImg();
            policyType = member.getPolicyMemberMappeds().stream()
                    .map(PolicyMemberDTO::new)
                    .collect(Collectors.toList());

        }


    }