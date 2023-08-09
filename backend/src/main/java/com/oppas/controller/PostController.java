package com.oppas.controller;

import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.PolicyFilterDTO;
import com.oppas.dto.PolicySummaryDTO;
import com.oppas.dto.post.PostDetailDto;
import com.oppas.dto.post.request.RequestPostDto;
import com.oppas.dto.post.response.ResponsePostDto;
import com.oppas.entity.Post;
import com.oppas.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping//게시글 작성
    public ResponseEntity registPost(Authentication authentication, @RequestBody RequestPostDto requestPostDto) throws Exception {

        System.out.println("들어옴");
        postService.savePost(authentication, requestPostDto);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping//게시글 목록보기
    public ResponseEntity<Page<ResponsePostDto>> getPostList(@RequestParam int pageIndex) throws Exception {
        Page<ResponsePostDto> posts = postService.getPostList(pageIndex);

        return new ResponseEntity<Page<ResponsePostDto>>(posts,HttpStatus.OK);
    }

    @GetMapping("/{postId}")//게시글 상세보기
    public ResponseEntity<?> getPostDetail(@PathVariable Long postId) {


        PostDetailDto postDetailDto = postService.getPost(postId);

        if (postDetailDto != null) {
            return new ResponseEntity(postDetailDto, HttpStatus.OK);
        } else
            return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity updatePost(Authentication authentication, @RequestBody RequestPostDto requestPostDto) {


        postService.modifyPost(authentication, requestPostDto);

        return new ResponseEntity(HttpStatus.OK);

    }


//    @DeleteMapping("/{postId}")
//    public ResponseEntity deletePost(Authentication authentication, Long postId) {
//
//        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
//        long memberId = principalDetails.getId();
//
//        postService.removePost(memberId, postId);
//
//        return new ResponseEntity(HttpStatus.OK);
//    }

}
