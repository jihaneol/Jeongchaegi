package com.oppas.dto;


import lombok.*;


@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PolicyChatPagingDto {

    private String  message;
    private Long  memberId;
    private String cursor; // 마지막 채팅의 시간
    private String nickName;
}
