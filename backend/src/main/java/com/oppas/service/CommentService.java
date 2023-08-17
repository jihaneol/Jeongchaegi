package com.oppas.service;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.comment.CommetSaveDto;
import com.oppas.dto.comment.request.CommentRequestDto;
import com.oppas.dto.comment.response.CommentResponseDto;
import com.oppas.entity.Comment;
import com.oppas.entity.member.Member;
import com.oppas.entity.Post;
import com.oppas.repository.CommentRepository;
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

@RequiredArgsConstructor
@Service
@Transactional
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
                    m.map(src -> src.getPost().getId(), CommentResponseDto::setPostId);
                    m.map(src -> src.getMember().getImg(), CommentResponseDto::setMemberImg);
                });
    }

    public void registComment(PrincipalDetails principalDetails, CommentRequestDto commentRequestDto) {

        Member member = principalDetails.getMember();
        System.out.println(member.toString());
        Post post = postRepository.findById(commentRequestDto.getPostId()).get();
        System.out.println(post.toString());
        CommetSaveDto commetSaveDto = CommetSaveDto.createSaveDto(post, member, commentRequestDto);

        Comment comment = modelMapper.map(commetSaveDto, Comment.class);
        System.out.println(comment.toString());

        commentRepository.save(comment);

    }

    public Page<CommentResponseDto> getListComment(Long postId, int pageIdx) {

        Pageable pageable = PageRequest.of(pageIdx - 1, 10, Sort.by("id").ascending());

        Post post = postRepository.findById(postId).orElseThrow(EntityNotFoundException::new);

        if (post == null) {
            return null;
        }

        Page<Comment> commentPage = commentRepository.findByPostId(postId, pageable);

        return commentPage.map(comment -> modelMapper.map(comment, CommentResponseDto.class));

    }

    public HttpStatus updateComment(PrincipalDetails principalDetails, CommentRequestDto commentRequestDto) {

        Member member = principalDetails.getMember();
        if (member.getId() != commentRequestDto.getMemberId()) {
            return HttpStatus.FORBIDDEN;
        }

        Comment comment = commentRepository.findById(commentRequestDto.getCommentId()).get();

        comment.setComment(commentRequestDto.getComment());

        System.out.println(comment.toString());

        return HttpStatus.OK;
    }


    public HttpStatus removeComment(PrincipalDetails principalDetails, Long commentId) {

        Member member = principalDetails.getMember();
        Comment comment = commentRepository.findById(commentId).get();


        if (member.getId() != comment.getMember().getId()) {
            return HttpStatus.FORBIDDEN;
        }


        commentRepository.delete(comment);

        return HttpStatus.OK;
    }


}
