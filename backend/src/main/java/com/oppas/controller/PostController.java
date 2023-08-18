package com.oppas.controller;


import com.oppas.config.auth.PrincipalDetails;
import com.oppas.dto.post.request.RequestPostDto;
import com.oppas.dto.post.response.PostDetailDto;
import com.oppas.dto.post.response.ResponsePostDto;
import com.oppas.service.CommentService;
import com.oppas.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final CommentService commentService;

    @PostMapping//게시글 작성
    public ResponseEntity registPost(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody RequestPostDto requestPostDto) throws Exception {
        postService.savePost(principalDetails, requestPostDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping//게시글 목록보기
    public ResponseEntity<Page<ResponsePostDto>> getPostList(@RequestParam int pageIndex) throws Exception {
        Page<ResponsePostDto> posts = postService.getPostList(pageIndex);
        return new ResponseEntity<Page<ResponsePostDto>>(posts,HttpStatus.OK);
    }

    @GetMapping("/my")
    public ResponseEntity<Page<ResponsePostDto>> getMyPostList(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                               @RequestParam int pageIndex) throws Exception {
        Long memberId = principalDetails.getId();
        Page<ResponsePostDto> posts = postService.getMyPostList(memberId, pageIndex);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{postId}")//게시글 상세보기
    public ResponseEntity<?> getPostDetail(@PathVariable Long postId) {
        PostDetailDto postDetailDto = postService.getPost(postId);
        if (postDetailDto != null) {
            return new ResponseEntity<>(postDetailDto, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity<?> updatePost(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody RequestPostDto requestPostDto) {
        HttpStatus status = postService.modifyPost(principalDetails, requestPostDto);
        return new ResponseEntity<>(status);

    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long postId) {
        HttpStatus httpStatus =  postService.removePost(principalDetails, postId);
        return new ResponseEntity<>(httpStatus);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPost(String keyword, @RequestParam int pageIndex){
        Page<ResponsePostDto> posts = postService.getSearchList(keyword,pageIndex);
        return new ResponseEntity<>(posts,HttpStatus.OK);
    }

}
