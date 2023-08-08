package com.oppas.dto.personalChat;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PersonalChatPagingDto {

    private String  message;
    private Long  memberId;
    private String cursor; // 마지막 채팅의 시간
    private String nickName;
}
