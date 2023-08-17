package com.oppas.service;

import com.oppas.dto.member.FollowInfo;
import com.oppas.dto.member.FollowListDTO;
import com.oppas.entity.Follow;
import com.oppas.entity.Member;
import com.oppas.repository.FollowRepository;
import com.oppas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final ModelMapper modelMapper;

    /**
     * 팔로우 하기
     */
    @Transactional
    public boolean follow(Long to, Long from) {

        // 남이 구독당함
        Member toMember = memberRepository.findById(to).get();
        // 내가 구독누름
        Member fromMember = memberRepository.findById(from).get();
        System.out.println(followRepository.existsByFollowerIdAndFolloweeId(to,from));
        // 팔로우중 이라면 true
        if(followRepository.existsByFollowerIdAndFolloweeId(to,from)){
            return false;
        }
        Follow follower = new Follow(toMember, fromMember);

        toMember.getFollowerList().add(follower);

        return true;
    }

    /**
     * 팔로우 취소
     */

    @Transactional
    public void unFollow(Long to, Long from) {

        followRepository.deleteByFollowerIdAndFolloweeId(to, from);
    }

    /**
     * 팔로우 수
     */
    public FollowInfo Info(Long id) {
        Member member = memberRepository.findById(id).get();

        return new FollowInfo(member.followCount(), member.followeeCount(), member.postCount());
    }

    /**
     * 팔로우 했는지 확인하기
     */
    public boolean checkFollow(Long toId, Long fromId) {
        boolean result = followRepository.findAllByFollowerId(toId).stream()
                .anyMatch(o -> o.getFollowee().getId() == fromId);
        return result;
    }

    public List<FollowListDTO> getfollowerList(Long id) {
//        PageRequest pageable = PageRequest.of(pageIndex - 1, 1000, Sort.by("id").descending());
        List<Member> followerMember = followRepository.findAllByFollowerId(id).stream()
                .map(o -> o.getFollowee())
                .collect(Collectors.toList());
        return followerMember.stream()
                .map(member -> new FollowListDTO(member.getId(), member.getNickname(), member.getImg()))
                .collect(Collectors.toList());
    }

    public List<FollowListDTO> getfolloweeList(Long id) {
        List<Member> followeeMember = followRepository.findAllByFolloweeId(id).stream()
                .map(o -> o.getFollower())
                .collect(Collectors.toList());
        return followeeMember.stream()
                .map(member -> new FollowListDTO(member.getId(), member.getNickname(), member.getImg()))
                .collect(Collectors.toList());
    }

    public List<FollowListDTO> searchNicknameFollower(String name, Long id) {
        List<Member> collect = followRepository.findLikeFollowerByname(name, id).stream()
                .map(o -> o.getFollower())
                .collect(Collectors.toList());
        return collect.stream()
                .map(member -> new FollowListDTO(member.getId(), member.getNickname(), member.getImg()))
                .collect(Collectors.toList());
    }

    public List<FollowListDTO> searchNicknameFollowee(String name, Long id) {
        List<Member> collect = followRepository.findLikeFolloweeByname(name, id).stream()
                .map(o -> o.getFollowee())
                .collect(Collectors.toList());

        return collect.stream()
                .map(member -> new FollowListDTO(member.getId(), member.getNickname(), member.getImg()))
                .collect(Collectors.toList());

    }
}
