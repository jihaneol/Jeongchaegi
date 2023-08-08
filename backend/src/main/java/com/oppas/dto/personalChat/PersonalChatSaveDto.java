package com.oppas.dto.personalChat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oppas.entity.policy.PolicyChat;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalChatSaveDto {

//    정책채팅은 사용자의 입장퇴장 관리가 필요없다.
//    private String type;
    private Long memberId;
    private Long roomId;// 프론트 테스트를 위해서 변환시켜 놓음 , 컨트롤러에 getRoomId랑 RedisSubscriber의 getRoomId랑 원상복구 필요
    private String message;
    private String nickName;


    
    private String createdAt;


    private static final ObjectMapper objectMapper = new ObjectMapper();


//
//    public static PersonalChatSaveDto createChatMessageSaveDto(PersonalChatSaveDto personalChatSaveDto){
//        return PersonalChatSaveDto.builder()
////    type관리가 필요 없으므로 그대로 보냄
////              .type(MessageType.TALK)
//                .policyId(personalChatSaveDto.getPolicyId())
//                .memberId(personalChatSaveDto.getMemberId())
//                .createdAt(personalChatSaveDto.getCreatedAt())
//                .message(personalChatSaveDto.getMessage())
//                .createdAt(personalChatSaveDto.getCreatedAt())
//                .nickName(personalChatSaveDto.getNickName())
//                .build();
//    }
//
//    public static PersonalChatSaveDto policyChatEntityToSaveDto(PolicyChat policyChat){
//        return PersonalChatSaveDto.builder()
////    type관리가 필요 없으므로 그대로 보냄
////              .type(MessageType.TALK)
//                .policyId(policyChat.getPolicy().getId())
//                .memberId(policyChat.getMember().getId())
//                .createdAt(policyChat.getCreatedAt())
//                .message(policyChat.getMessage())
//                .createdAt(policyChat.getCreatedAt())
//                .nickName(policyChat.getMember().getNickname())
//                .build();
//    }
//
//
//    @Override
//    public String toString() {
//        return "PolicyChatSaveDto{" +
//                "memberId=" + memberId +
//                ", policyId=" + policyId +
//                ", message='" + message + '\'' +
//                ", nickName='" + nickName + '\'' +
//                ", createdAt=" + createdAt +
//                '}';
//    }
}
