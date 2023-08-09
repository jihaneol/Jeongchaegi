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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
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
    public void savePost(Authentication authentication, RequestPostDto requestPostDto) throws Exception {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
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

    @Transactional
    public void modifyPost(Authentication authentication, RequestPostDto requestPostDto){

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Member member = principalDetails.getMember();


        Post post =  postRepository.findById(requestPostDto.getId()).orElseThrow(EntityNotFoundException::new);

        post.modifyPost(requestPostDto.getTitle(),requestPostDto.getContent());


    }

    @Transactional
    public HttpStatus removePost(Authentication authentication, Long postId){


        Post post =  postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);
        if(post.getMember().getId()==(((PrincipalDetails)(authentication.getPrincipal())).getMember().getId())){
            postRepository.delete(post);
            return HttpStatus.OK;
        }
        else{
            return HttpStatus.FORBIDDEN;
        }
    }

    public Page<ResponsePostDto> getPostList(int pageIndex){


        Pageable pageable = PageRequest.of(pageIndex - 1, 10);

        Page<Post> postList = postRepository.findAll(pageable);


        Page<ResponsePostDto> policyPages = postList.map(post -> modelMapper.map(post, ResponsePostDto.class));
        return policyPages;

    }



}
