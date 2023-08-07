//package com.oppas.scheduler;
//
//import com.hanghae.final_project.api.chat.dto.request.ChatMessageSaveDto;
//import com.hanghae.final_project.domain.model.Chat;
//import com.hanghae.final_project.domain.model.WorkSpace;
//import com.hanghae.final_project.domain.repository.chat.ChatJdbcRepository;
//import com.hanghae.final_project.domain.repository.chat.ChatRepository;
//import com.hanghae.final_project.domain.repository.workspace.WorkSpaceRepository;
//import com.oppas.dto.PolicyChatSaveDto;
//import com.oppas.entity.policy.PolicyChat;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.redis.core.*;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class PolicyChatWriteToMySqlScheduler {
//
//    private final RedisTemplate<String,Object> redisTemplate;
//
//    private final RedisTemplate<String, PolicyChatSaveDto> chatRedisTemplate;
//
////    private final ChatRepository chatRepository;
//
////    private final ChatJdbcRepository chatJdbcRepository;
////    private final WorkSpaceRepository workSpaceRepository;
//
//    @Scheduled(cron = "0 0 0/1 * * *")
//    @Transactional
//    public void writeBack(){
//        log.info("Scheduling start");
//        //여기서부터 읽어오는 과정.
//        BoundZSetOperations<String, PolicyChatSaveDto> setOperations = chatRedisTemplate.boundZSetOps("NEW_CHAT");
//
//        ScanOptions scanOptions = ScanOptions.scanOptions().build();
//
//        List<PolicyChat> chatList = new ArrayList<>();
//        try(Cursor<ZSetOperations.TypedTuple<PolicyChatSaveDto>> cursor= setOperations.scan(scanOptions)){
//
//            while(cursor.hasNext()){
//                ZSetOperations.TypedTuple<PolicyChatSaveDto> chatMessageDto =cursor.next();
//
////                WorkSpace workSpace= workSpaceRepository
////                        .findById(Long.parseLong(chatMessageDto.getValue().getRoomId()))
////                        .orElse(null);
////
////                if(workSpace==null) {
////                    continue;
////                }
////
////                chatList.add( Chat.of(chatMessageDto.getValue(),workSpace));
//            }
//            chatJdbcRepository.batchInsertRoomInventories(chatList);
//
//            redisTemplate.delete("NEW_CHAT");
//
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//
//        log.info("Scheduling done");
//    }
//}
