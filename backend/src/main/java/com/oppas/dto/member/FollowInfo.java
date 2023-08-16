package com.oppas.dto.member;

import lombok.Data;

@Data
public class FollowInfo {

    private int follower;
    private int followee;
    private int post;

    public FollowInfo(int follower, int followee, int post) {
        this.follower = follower;
        this.followee = followee;
        this.post = post;
    }
}
