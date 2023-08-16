package com.oppas.repository;

import com.oppas.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {

    Page<Post> findPosts(String keyword, Pageable pageable);

}
