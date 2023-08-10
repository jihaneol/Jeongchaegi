package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.comment.request.CommentRequestDto;
import com.oppas.dto.comment.response.CommentResponseDto;
import com.oppas.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping // 채팅 생성
    public ResponseEntity<?> registComment(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CommentRequestDto commentRequestDto) {

        if(commentRequestDto.getComment()==null || commentRequestDto.getPostId()==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        commentService.registComment(principalDetails,commentRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{postId}/{pageIdx}") // 채팅 생성

    public ResponseEntity<?> listComment(@PathVariable Long postId,@PathVariable int pageIdx) {

        Page<CommentResponseDto> pageComment = commentService.getListComment(postId,pageIdx);

        if(pageComment==null){return new ResponseEntity<>(HttpStatus.NO_CONTENT);}

        return new ResponseEntity<Page<CommentResponseDto>>(pageComment,HttpStatus.OK);
    }



}
