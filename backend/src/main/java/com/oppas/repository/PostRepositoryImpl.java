package com.oppas.repository;


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

    private BooleanBuilder search(String keyword) {


        BooleanBuilder builder = new BooleanBuilder();

       if(keyword != null || keyword.isEmpty()) {

            String[] contentArray = keyword.split("\\s+");
            for (String word : contentArray) {
                BooleanExpression contentExpression = post.content.containsIgnoreCase(word);
                BooleanExpression titleExpression = post.title.containsIgnoreCase(word);
                builder.or(contentExpression).or(titleExpression);
            }


        }
        return builder;
    }

    @Override
    public Page<Post> findPosts(String keyword, Pageable pageable) {

        QueryResults<Post> queryResults = queryFactory
                .selectFrom(post)
                .where(search(keyword))
                .orderBy(post.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageable, queryResults.getTotal());
    }


}


