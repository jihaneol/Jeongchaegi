package com.oppas.service;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.comment.CommetSaveDto;
import com.oppas.dto.comment.request.CommentRequestDto;
import com.oppas.dto.comment.response.CommentResponseDto;
import com.oppas.entity.Comment;
import com.oppas.entity.Member;
import com.oppas.entity.Post;
import com.oppas.repository.CommentRepository;
import com.oppas.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final ModelMapper modelMapper;

    @PostConstruct
    private void initializeTypeMaps() {
        modelMapper.createTypeMap(Comment.class, CommentResponseDto.class)
                .addMappings(m -> {
                    m.map(src -> src.getMember().getId(), CommentResponseDto::setMemberId);
                    m.map(src -> src.getMember().getNickname(), CommentResponseDto::setNickname);
                });
    }

    public void registComment(PrincipalDetails principalDetails, CommentRequestDto commentRequestDto){

        Member member = principalDetails.getMember();
        Post post = postRepository.findById(commentRequestDto.getPostId()).get();

        CommetSaveDto commetSaveDto =CommetSaveDto.createSaveDto(post,member,commentRequestDto);

        Comment comment = modelMapper.map(commetSaveDto,Comment.class);
        System.out.println(comment.toString());

        commentRepository.save(comment);

    }

    public Page<CommentResponseDto> getListComment(Long postId, int pageIdx){

        Pageable pageable = PageRequest.of(pageIdx-1,10, Sort.by("id").descending());

        Post post = postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);

        if(post==null){
            return null;
        }

        Page<Comment> commentPage = commentRepository.findByPostId(postId,pageable);

        return commentPage.map(comment -> modelMapper.map(comment, CommentResponseDto.class));

    }


}
