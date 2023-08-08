package com.oppas.dto.personalChat;



import com.oppas.entity.policy.PolicyChat;
import lombok.*;


@Getter
@NoArgsConstructor
@Builder
@Setter
@AllArgsConstructor
public class PersonalChatPagingResponseDto {

    private Long roomId;
    private Long memberId;
    private String message;

    private String createdAt;
    private String nickname;



    public static PersonalChatPagingResponseDto byChatMessageDto(PersonalChatSaveDto personalChatSaveDto){
        return PersonalChatPagingResponseDto.builder()
                .memberId(personalChatSaveDto.getMemberId())
                .createdAt(personalChatSaveDto.getCreatedAt())
                .roomId(personalChatSaveDto.getRoomId())
                .message(personalChatSaveDto.getMessage())
                .nickname(personalChatSaveDto.getNickName())
                .build();
    }


//    public static PersonalChatPagingResponseDto policyChatEntityToPagingResponseDto(PolicyChat policyChat){
//        return PersonalChatPagingResponseDto.builder()
//                .memberId(policyChat.getMember().getId())
//                .createdAt(policyChat.getCreatedAt())
//                .roomId(policyChat.getPolicy().getId())
//                .message(policyChat.getMessage())
//                .nickname(policyChat.getMember().getNickname())
//                .build();
//    }
//
//    @Override
//    public String toString() {
//        return "PolicyChatPagingResponseDto{" +
//                "policyId=" + policyId +
//                ", memberId=" + memberId +
//                ", message='" + message + '\'' +
//                ", createdAt='" + createdAt + '\'' +
//                ", nickname='" + nickname + '\'' +
//                '}';
//    }
}
