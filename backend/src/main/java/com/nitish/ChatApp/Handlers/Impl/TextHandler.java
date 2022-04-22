package com.nitish.ChatApp.Handlers.Impl;

import com.nitish.ChatApp.Entity.MessageBody;
import com.nitish.ChatApp.Handlers.Handler;
import com.nitish.ChatApp.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TextHandler implements Handler {
    private final static String DESTINATION = "topic/greeting";
    private SimpMessagingTemplate messagingTemplate;
    private SimpUserRegistry userReg;
    private UserRepository userRepo;
    private MessageBody messageBody;

    @Autowired
    public TextHandler(SimpMessagingTemplate messagingTemplate, SimpUserRegistry userReg, UserRepository userRepo, MessageBody messageBody){
        this.messagingTemplate = messagingTemplate;
        this.userReg = userReg;
        this.messageBody = messageBody;
        this.userRepo = userRepo;
    }

    @Override
    public void returnMessage() {
        //getting the list of all logged in users
        List<String> avilableUser = new ArrayList<>();
        for(SimpUser user: userReg.getUsers()){
            avilableUser.add(user.getName());
        }

        //send message to the logged in users only
        for(String reciever: messageBody.getReciever()){
            if(avilableUser.contains(reciever)){
                messagingTemplate.convertAndSendToUser(userRepo.findEmailByUserName(reciever),DESTINATION
                ,messageBody.getMessage());
            }
        }
    }
}
