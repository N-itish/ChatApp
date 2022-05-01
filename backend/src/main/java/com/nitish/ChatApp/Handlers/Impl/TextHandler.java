package com.nitish.ChatApp.Handlers.Impl;

import com.nitish.ChatApp.Entity.MessageBody;
import com.nitish.ChatApp.Handlers.Handler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class TextHandler implements Handler {

    private final static String DESTINATION = "topic/greeting";

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageBody messageBody;
    public static HashMap<UUID,List<String>> userGroup = new HashMap<>();

    @Autowired
    public TextHandler(SimpMessagingTemplate messagingTemplate,  MessageBody messageBody){
        this.messagingTemplate = messagingTemplate;
        this.messageBody = messageBody;
    }

    @Override
    public void deliverMessage() {
        String groupId = createGroup(messageBody.getRecievers(),messageBody.getGroupId()).toString();
        List<String> group = new ArrayList<>();
        //check the group id then send to appropriate group
        for(UUID key: userGroup.keySet()){
            if(key.toString().equalsIgnoreCase(groupId)){
                group = userGroup.get(key);
                break;
            }
        }
        for(String receiver: group){
                messagingTemplate.convertAndSendToUser(receiver,DESTINATION
                ,messageBody.getMessage());
        }
    }

    private UUID createGroup(String[] group,String groupId){
        UUID uniqueGroupId;
        //creating unique group id if not exists
        if(groupId == null){
            uniqueGroupId = UUID.randomUUID();
        }else {
            uniqueGroupId = UUID.fromString(groupId);
        }
        groupId = uniqueGroupId.toString();
        //adding new group only if the group does not exists
        if(!userGroup.containsKey(uniqueGroupId)) {
            userGroup.put(uniqueGroupId, Arrays.asList(group));
            //sending this unique key to all the group members to form group
            for(String reciever:messageBody.getRecievers()){
                messagingTemplate.convertAndSendToUser(reciever,DESTINATION,"GRP-ID:"+groupId);
            }
        }
        return uniqueGroupId;
    }
}

