package com.oppas.service;


import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.post.request.RequestPostDto;
import com.oppas.dto.post.response.PostDetailDto;
import com.oppas.dto.post.response.ResponsePostDto;
import com.oppas.entity.Post;
import com.oppas.entity.member.Member;
import com.oppas.entity.policy.Policy;
import com.oppas.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    @PostConstruct
    private void initializeTypeMaps() {
        modelMapper.createTypeMap(Post.class, ResponsePostDto.class)
                .addMappings(m -> {
                    m.map(src -> src.getMember().getId(), ResponsePostDto::setMemberId);
                    m.map(src -> src.getMember().getNickname(), ResponsePostDto::setNickname);
                    m.map(src -> src.getMember().getImg(), ResponsePostDto::setMemberImg);
                });
    }

    @Transactional
    public void savePost(PrincipalDetails principalDetails, RequestPostDto requestPostDto) throws Exception {
        Member member = principalDetails.getMember();
        requestPostDto.setMember(member);
        requestPostDto.setCreatedAt(LocalDateTime.now());
        Post post = modelMapper.map(requestPostDto, Post.class);
        postRepository.save(post);
    }

    public Page<ResponsePostDto> getPostList(int pageIndex) {
        Pageable pageable = PageRequest.of(pageIndex - 1, 10, Sort.by("id").descending());
        Page<Post> postList = postRepository.findAll(pageable);
        return postList.map(post -> modelMapper.map(post, ResponsePostDto.class));
    }

    public Page<ResponsePostDto> getMyPostList(Long memberId, int pageIndex) throws Exception {
        Pageable pageable = PageRequest.of(pageIndex - 1, 10, Sort.by("id").descending());
        Page<Post> postList = postRepository.findByMemberId(memberId, pageable);
        return postList.map(post -> modelMapper.map(post, ResponsePostDto.class));
    }

    public PostDetailDto getPost(Long postId) {
        Optional<Post> postOption = postRepository.findById(postId);
        if (postOption.isPresent()) {
            PostDetailDto postDetailDto = PostDetailDto.createPostDetailDto(postOption.get());
            Policy relatePolicy = postOption.get().getPolicy();
            if (relatePolicy != null) {
                postDetailDto.setPolicy(relatePolicy.getId(), relatePolicy.getPolyBizSjnm());
            }
            return postDetailDto;
        } else {
            return null;
        }
    }

    @Transactional//수저 필요 유저의 정보와 게시물 작성자 일치 여부 확인 필요
    public HttpStatus modifyPost(PrincipalDetails principalDetails, RequestPostDto requestPostDto) {
        Member member = principalDetails.getMember();
        if (requestPostDto.getMemberId() == null || member == null || !(requestPostDto.getMemberId().equals(member.getId()))) {
            System.out.println("forbidden");
            return HttpStatus.FORBIDDEN;
        }

        Optional<Post> postOptional = postRepository.findById(requestPostDto.getId());
        if (postOptional.isEmpty()) {
            return HttpStatus.NO_CONTENT;
        }
        Post post = postOptional.get();
        post.modifyPost(requestPostDto.getTitle(), requestPostDto.getContent());
        return HttpStatus.OK;
    }

    @Transactional
    public HttpStatus removePost(PrincipalDetails principalDetails, Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);
        if (Objects.equals(post.getMember().getId(), principalDetails.getMember().getId())) {
            postRepository.delete(post);
            return HttpStatus.OK;
        } else {
            return HttpStatus.FORBIDDEN;
        }
    }

    public Page<ResponsePostDto> getSearchList(String keyword, int pageIndex) {
        Pageable pageable = PageRequest.of(pageIndex - 1, 10);
        Page<Post> postList = postRepository.findPosts(keyword, pageable);
        return postList.map(post -> modelMapper.map(post, ResponsePostDto.class));
    }

}
