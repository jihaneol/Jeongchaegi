package com.oppas.repository;


import com.oppas.entity.policy.PolicyChat;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatJdbcRepository {

    private final JdbcTemplate jdbcTemplate;


    public void batchInsertRoomInventories(List<PolicyChat> chatList){

        String sql = "INSERT INTO policy_chat"
                +  "(policy_id,member_id,message,created_at) VALUE(?,?,?,?)";


        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                PolicyChat policyChat = chatList.get(i);
                ps.setLong(1,policyChat.getPolicy().getId());
                ps.setLong(2,policyChat.getMember().getId());
                ps.setString(3,policyChat.getMessage());
                ps.setString(4,policyChat.getCreatedAt());
            }

            @Override
            public int getBatchSize() {
                return chatList.size();
            }
        });
    }

}