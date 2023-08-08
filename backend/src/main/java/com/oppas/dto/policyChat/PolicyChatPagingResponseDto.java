package com.oppas.dto.policyChat;



import com.oppas.entity.policy.PolicyChat;
import lombok.*;


@Getter
@NoArgsConstructor
@Builder
@Setter
@AllArgsConstructor
public class PolicyChatPagingResponseDto {

    private Long policyId;
    private Long memberId;
    private String message;

    private String createdAt;
    private String nickname;



    public static PolicyChatPagingResponseDto byChatMessageDto(PolicyChatSaveDto policyChatSaveDto){
        return PolicyChatPagingResponseDto.builder()
                .memberId(policyChatSaveDto.getMemberId())
                .createdAt(policyChatSaveDto.getCreatedAt())
                .policyId(policyChatSaveDto.getPolicyId())
                .message(policyChatSaveDto.getMessage())
                .nickname(policyChatSaveDto.getNickName())
                .build();
    }


    public static PolicyChatPagingResponseDto policyChatEntityToPagingResponseDto(PolicyChat policyChat){
        return PolicyChatPagingResponseDto.builder()
                .memberId(policyChat.getMember().getId())
                .createdAt(policyChat.getCreatedAt())
                .policyId(policyChat.getPolicy().getId())
                .message(policyChat.getMessage())
                .nickname(policyChat.getMember().getNickname())
                .build();
    }

    @Override
    public String toString() {
        return "PolicyChatPagingResponseDto{" +
                "policyId=" + policyId +
                ", memberId=" + memberId +
                ", message='" + message + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
