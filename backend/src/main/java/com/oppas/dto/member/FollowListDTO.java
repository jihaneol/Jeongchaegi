package com.oppas.dto.member;

import lombok.Data;

@Data

public class FollowListDTO {
    private Long id;
    private String nickname;
    private String img;

    public FollowListDTO(Long id, String nickname, String img) {
        this.id = id;
        this.nickname = nickname;
        this.img = img;
    }
}
