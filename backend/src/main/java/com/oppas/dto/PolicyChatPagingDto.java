package com.oppas.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PolicyChatPagingDto {

    private String  message;
    private Long  memberId;
    private LocalDateTime cursor; // 마지막 채팅의 시간
    private String nickName;
}
