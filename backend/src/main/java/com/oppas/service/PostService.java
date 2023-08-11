package com.oppas.service;


import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.post.request.RequestPostDto;
import com.oppas.dto.post.response.PostDetailDto;
import com.oppas.dto.post.response.ResponsePostDto;
import com.oppas.entity.Member;
import com.oppas.entity.Post;
import com.oppas.repository.MemberRepository;
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
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper modelMapper;

    @PostConstruct
    private void initializeTypeMaps() {
        modelMapper.createTypeMap(Post.class, ResponsePostDto.class)
                .addMappings(m -> {
                    m.map(src -> src.getMember().getId(), ResponsePostDto::setMemberId);
                    m.map(src -> src.getMember().getNickname(), ResponsePostDto::setNickname);
                });
    }


    @Transactional
    public void savePost(PrincipalDetails principalDetails, RequestPostDto requestPostDto) throws Exception {

        Member member = principalDetails.getMember();

        requestPostDto.setMember(member);
        requestPostDto.setCreatedAt(LocalDateTime.now());
        Post post = modelMapper.map(requestPostDto,Post.class );

        postRepository.save(post);

    }

    public PostDetailDto getPost(Long postId){

        Optional<Post>postOption =  postRepository.findById(postId) ;


        if(postOption.isPresent()) {
            PostDetailDto postDetailDto = PostDetailDto.createPostDetailDto(postOption.get());
            return postDetailDto;
        }
        else{
            return null;
        }
    }

    @Transactional//수저 필요 유저의 정보와 게시물 작성자 일치 여부 확인 필요
    public HttpStatus modifyPost(PrincipalDetails principalDetails, RequestPostDto requestPostDto){

        System.out.println(requestPostDto);
        Member member = principalDetails.getMember();
        System.out.println(member.toString());
        if(requestPostDto.getMemberId()==null||member==null||!(requestPostDto.getMemberId().equals(member.getId()))) {
            System.out.println("forbidden");
            return HttpStatus.FORBIDDEN;
        }
        Optional<Post> postOptional = postRepository.findById(requestPostDto.getId());

        if(postOptional.isEmpty()){
            System.out.println("nocon");
            return HttpStatus.NO_CONTENT;
        }
        System.out.println("최종");
        Post post = postOptional.get();
        System.out.println(post.toString());
        post.modifyPost(requestPostDto.getTitle(), requestPostDto.getContent());
        System.out.println(post.toString());

        return HttpStatus.OK;
    }

    @Transactional
    public HttpStatus removePost(PrincipalDetails principalDetails, Long postId){


        Post post =  postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);

        if(post.getMember().getId()==(principalDetails.getMember().getId())){

            postRepository.delete(post);

            return HttpStatus.OK;
        }
        else{
            return HttpStatus.FORBIDDEN;
        }
    }

    public Page<ResponsePostDto> getPostList(int pageIndex){


        Pageable pageable = PageRequest.of(pageIndex - 1, 10, Sort.by("id").descending());

        Page<Post> postList = postRepository.findAll(pageable);


        Page<ResponsePostDto> policyPages = postList.map(post -> modelMapper.map(post, ResponsePostDto.class));
        return policyPages;

    }



}
