package com.oppas.repository;


import com.oppas.entity.member.Follow;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {


    boolean existsByFollowerIdAndFolloweeId(Long followeeId, Long followerId);

    @Query(value = "select f from Follow f join fetch f.followee fe join fetch f.follower fr where fr.id = :toId" )
    List<Follow> findAllByFollowerId(@Param("toId") Long toId);

    @Query(value = "select f from Follow f join fetch f.followee fe join fetch f.follower fr where fe.id = :toId")
    List<Follow> findAllByFolloweeId(@Param("toId") Long toId);

    @Query(value = "select f from Follow f join fetch f.followee fe join fetch f.follower fr where fr.id = :toId and fe.nickname like '%' || :name || '%'")
    List<Follow> findLikeFollowerByname(@Param("name") String name,@Param("toId") Long toId);

    @Query(value = "select f from Follow f join fetch f.followee fe join fetch f.follower fr where fe.id = :toId and fr.nickname like '%' || :name || '%'")
    List<Follow> findLikeFolloweeByname(@Param("name") String name,@Param("toId") Long toId);

    void deleteByFollowerIdAndFolloweeId(Long followerId, Long followeeId);
}
