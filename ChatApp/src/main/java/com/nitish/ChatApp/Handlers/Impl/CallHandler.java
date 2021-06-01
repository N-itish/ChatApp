package com.nitish.ChatApp.Handlers.Impl;

import com.nitish.ChatApp.Entity.MessageBody;
import com.nitish.ChatApp.Handlers.Handler;
import com.nitish.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;


@Service
public class CallHandler implements Handler {
    private final static String DESTINATION = "topic/greeting";
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageBody messageBody;
    private UserRepository userRepo;

    @Autowired
    public CallHandler(SimpMessagingTemplate messagingTemplate,UserRepository userRepo, MessageBody messageBody){
            this.messagingTemplate = messagingTemplate;
            this.messageBody = messageBody;
            this.userRepo = userRepo;
    }
    @Override
    public void returnMessage() {
        if(messageBody.getMessage().equalsIgnoreCase("CallRequested")) {
            //convertAndSendToUser automatically adds the "/user/" infront of the destination string
            System.out.println("Requesting permission from reciever");
            messagingTemplate.convertAndSendToUser(userRepo.findEmailByUserName(messageBody.getReciever()), DESTINATION,
                    userRepo.findEmailByUserName(messageBody.getSender()));
        }else if(messageBody.getMessage().equalsIgnoreCase("CallAccepted")){
            //TODO: how to identify sender
            messagingTemplate.convertAndSendToUser(userRepo.findEmailByUserName(messageBody.getReciever()), DESTINATION,
                    "CallRequest");
        }else{
            messagingTemplate.convertAndSendToUser(userRepo.findEmailByUserName(messageBody.getReciever()), DESTINATION,
                    messageBody.getMessage());
        }
    }
}
