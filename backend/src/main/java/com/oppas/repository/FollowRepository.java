package com.oppas.repository;


import com.oppas.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    void  deleteByFolloweeIdAndFollowerId(Long followeeId, Long followerId);
    List<Follow> findAllByFollowerId(Long toId);

    List<Follow> findAllByFolloweeId(Long id);
}
