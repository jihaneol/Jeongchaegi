package com.oppas.repository;

import com.oppas.dto.post.request.PostFilterDTO;
import com.oppas.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {

    Page<Post> findPosts(PostFilterDTO filter, Pageable pageable);

}
