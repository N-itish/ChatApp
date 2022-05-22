package com.nitish.ChatApp.Handlers.Impl;

import com.nitish.ChatApp.models.Group;
import com.nitish.ChatApp.Handlers.Handler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
public class TextHandler implements Handler {

    private final static String DESTINATION = "topic/greeting";
    private SimpMessagingTemplate messagingTemplate;
    private Group messageGroup;

    @Autowired
    public TextHandler(SimpMessagingTemplate messagingTemplate,  Group messageGroup){
        this.messagingTemplate = messagingTemplate;
        this.messageGroup = messageGroup;
    }

    @Override
    public void deliverMessage() {
        String[] recievers = messageGroup.getRecievers();
        for(String receiver: recievers){
            messagingTemplate.convertAndSendToUser(receiver,DESTINATION,messageGroup);
        }
    }
}

