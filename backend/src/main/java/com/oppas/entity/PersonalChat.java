package com.oppas.entity.policy;

import com.oppas.dto.personalChat.PersonalChatSaveDto;
import com.oppas.dto.policyChat.PolicyChatSaveDto;
import com.oppas.entity.ChatRoom;
import com.oppas.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor// 기본생성자 생성
@AllArgsConstructor//모든 필드를 파라미터로 가지는 생성자
@Entity
@Getter
@Builder
public class PersonalChat {

    @Id
    @Column(name = "personal_chat_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = false)
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String createdAt;

    private String message;

    public static PersonalChat of(PersonalChatSaveDto personalChatSaveDto, Member member, ChatRoom chatRoom){

        return PersonalChat.builder()
                .message(personalChatSaveDto.getMessage())
                .createdAt(personalChatSaveDto.getCreatedAt())
                .member(member)
                .chatRoom(chatRoom)
                .build();


    }


}
