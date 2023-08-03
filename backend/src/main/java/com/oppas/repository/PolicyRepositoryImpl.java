package com.oppas.repository;

import com.oppas.dto.PolicyFilterDTO;
import com.oppas.entity.policy.Policy;
import com.oppas.entity.policy.QPolicy;
import com.oppas.entity.policy.QPolicyDate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PolicyRepositoryImpl implements PolicyRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final QPolicy policy = QPolicy.policy;
    private final QPolicyDate policyDate = QPolicyDate.policyDate;

    private BooleanExpression typeIn(List<String> types) {
        return types != null && types.size() > 0 ? policy.polyRlmCd.in(types) : null;
    }

    private BooleanExpression regionEq(String region) {
        return region != null ? policy.srchPolyBizSecd.eq(region) : null;
    }

    private BooleanExpression ageBetween(Integer age) {
        return age != null ? policy.minAge.loe(age).and(policy.maxAge.goe(age)) : null;
    }

    private BooleanExpression keywordLike(String keyword) {
        return keyword != null ? policy.polyBizSjnm.like("%" + keyword + "%")
                .or(policy.polyItcnCn.like("%" + keyword + "%")) : null;
    }

    private BooleanExpression dateBetween(LocalDate date) {
        if (date == null) {
            return null;
        } else if (policyDate.rqutPrdBegin != null && policyDate.rqutPrdEnd != null) {
            return policyDate.rqutPrdBegin.before(date).and(policyDate.rqutPrdEnd.after(date));
        } else if (policyDate.rqutPrdBegin != null) {
            return policyDate.rqutPrdBegin.before(date);
        } else if (policyDate.rqutPrdEnd != null) {
            return policyDate.rqutPrdEnd.after(date);
        }
        return Expressions.asBoolean(false);
    }

    @Override
    public Page<Policy> findPolicies(PolicyFilterDTO filter, Pageable pageable) {
        List<String> types = filter.getTypes();
        String region = filter.getRegion();
        Integer age = filter.getAge();
        String keyword = filter.getKeyword();
        String dateString = filter.getDate();
        LocalDate date = dateString != null ? LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null;
        System.out.println("types: " + types);
        System.out.println("region: " + region);
        System.out.println("age: " + age);
        System.out.println("keyword: " + keyword);
        System.out.println("date: " + date);

        List<Policy> content = queryFactory
                .selectFrom(policy)
                .leftJoin(policy.policyDates, policyDate)
                .fetchJoin()
                .where(typeIn(types))
                .where(regionEq(region))
                .where(ageBetween(age))
                .where(keywordLike(keyword))
                .where(dateBetween(date))
                .orderBy(policy.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(content, pageable, content.size());
    }
}
