package com.oppas.repository;


import com.oppas.dto.post.request.PostFilterDTO;
import com.oppas.entity.Post;
import com.oppas.entity.QMember;
import com.oppas.entity.QPost;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    private final QPost post = QPost.post;
    private final QMember member = QMember.member;

    private BooleanBuilder search(PostFilterDTO filter) {


        String nickname = filter.getNickname();
        String title = filter.getTitle();
        String content = filter.getContent();

        BooleanBuilder builder = new BooleanBuilder();
        BooleanExpression expression = null;

        if (nickname != null) {
            expression = post.member.nickname.contains(nickname);
            builder.or(expression);
        }

        else if (title != null) {
            String[] titleArray = title.split("\\s+");
            for (String word : titleArray) {
                expression = post.title.containsIgnoreCase(word);
                builder.and(expression);
            }
        } else if (content == null) return null;
        else {
            String[] contentArray = content.split("\\s+");
            for (String word : contentArray) {
                expression = post.content.containsIgnoreCase(word);
                builder.and(expression);
            }


        }
        return builder;
    }

    @Override
    public Page<Post> findPosts(PostFilterDTO filter, Pageable pageable) {

        QueryResults<Post> queryResults = queryFactory
                .selectFrom(post)
                .where(search(filter))
                .orderBy(post.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageable, queryResults.getTotal());
    }


}


