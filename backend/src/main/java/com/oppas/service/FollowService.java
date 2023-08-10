package com.oppas.service;

import com.oppas.entity.Follow;
import com.oppas.entity.Member;
import com.oppas.repository.FollowRepository;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    @Transactional
    public void follow(Long to, Long from) {

        // 남이 구독당함
        Member toMember = memberRepository.findById(to).get();
        // 내가 구독누름
        Member fromMember = memberRepository.findById(from).get();

        Follow follower = new Follow(toMember,fromMember);

        toMember.getFollowerList().add(follower);
//        followRepository.save(follower);
    }

    @Transactional
    public void unFollow(Long to, Long from) {

        // 남이 구독당함
        Member toMember = memberRepository.findById(to).get();
        // 내가 구독누름
        Member fromMember = memberRepository.findById(from).get();

        toMember.getFollowerList().stream()
                        .filter(o -> o.getFollowerId().getId()==to)
                                .collect(Collectors.toList())
                                        .forEach(li -> toMember.getFollowerList().remove(li.getId()));

        fromMember.getFolloweeList().stream()
                .filter(o -> o.getFollowerId().getId()==from)
                .collect(Collectors.toList())
                .forEach(li -> toMember.getFolloweeList().remove(li.getId()));
    }
}
