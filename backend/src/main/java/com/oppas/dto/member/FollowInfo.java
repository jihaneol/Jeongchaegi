package com.oppas.dto.member;

import lombok.Data;

@Data
public class FollowInfo {

    private int follower;
    private int followee;

    public FollowInfo(int follower, int followee) {
        this.follower = follower;
        this.followee = followee;
    }
}
