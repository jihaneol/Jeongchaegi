package com.oppas.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FollowInfo {
    private int follower;
    private int followee;
    private int post;
}
