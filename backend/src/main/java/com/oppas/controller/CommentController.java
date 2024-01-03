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
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping // 답글 생성
    public ResponseEntity<?> registComment(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CommentRequestDto commentRequestDto) {

        if (commentRequestDto.getComment() == null || commentRequestDto.getPostId() == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        commentService.registComment(principalDetails, commentRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{postId}") // 답글 리스트
    public ResponseEntity<?> listComment(@PathVariable Long postId, @RequestParam int pageIdx) {

        Page<CommentResponseDto> pageComment = commentService.getListComment(postId, pageIdx);

        if (pageComment.getContent().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(pageComment, HttpStatus.OK);
    }

    @PutMapping // 답글 업데이트
    public ResponseEntity<?> modifyComment(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody CommentRequestDto commentRequestDto) {

        if (commentRequestDto.getComment() == null || commentRequestDto.getCommentId() == null || commentRequestDto.getMemberId() == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        HttpStatus status = commentService.updateComment(principalDetails, commentRequestDto);


        return new ResponseEntity<>(status);
    }

    @DeleteMapping("/{commentId}")//답글 삭제
    public ResponseEntity<?> deleteComment(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long commentId) {

        HttpStatus status = commentService.removeComment(principalDetails, commentId);

        return new ResponseEntity<>(status);
    }

}
