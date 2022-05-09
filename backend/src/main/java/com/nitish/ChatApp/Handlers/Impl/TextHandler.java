package com.nitish.ChatApp.Handlers.Impl;

import com.nitish.ChatApp.models.MessageBody;
import com.nitish.ChatApp.Handlers.Handler;
import com.nitish.ChatApp.models.UserGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class TextHandler implements Handler {

    private final static String DESTINATION = "topic/greeting";

    private SimpMessagingTemplate messagingTemplate;
    private MessageBody messageBody;
    private UserGroups groups;

    @Autowired
    public TextHandler(SimpMessagingTemplate messagingTemplate,  MessageBody messageBody){
        this.groups = new UserGroups();
        this.messagingTemplate = messagingTemplate;
        this.messageBody = messageBody;
    }

    @Override
    public void deliverMessage() {
        String groupId = groups.createGroup(messageBody.getRecievers(),messageBody.getGroupId()).toString();
        List<String> group = groups.getGroup(groupId);
        //sending the groupId and the message to all the people in the group
        for(String receiver: group){
            if(!groupId.equalsIgnoreCase(messageBody.getGroupId())) {
                messagingTemplate.convertAndSendToUser(receiver, DESTINATION, "GRP-ID:" + groupId);
            }
            messagingTemplate.convertAndSendToUser(receiver,DESTINATION,messageBody.getMessage());
        }
    }
}

