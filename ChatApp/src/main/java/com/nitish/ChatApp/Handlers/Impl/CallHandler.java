package com.nitish.ChatApp.Handlers.Impl;

import com.nitish.ChatApp.Entity.PrivateMessage;
import com.nitish.ChatApp.Handlers.Handler;
import com.nitish.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;

public class CallHandler implements Handler {
    private final static String DESTINATION = "topic/greeting";
    private SimpMessagingTemplate messagingTemplate;
    private SimpUserRegistry userReg;
    private PrivateMessage messageBody;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    public CallHandler(SimpMessagingTemplate messagingTemplate, SimpUserRegistry userReg, PrivateMessage messageBody){
            this.messagingTemplate = messagingTemplate;
            this.userReg = userReg;
            this.messageBody = messageBody;
    }
    @Override
    public void returnMessage() {
        //if the global is sent as reciver then message is sent to everyone connected
        if (messageBody.getReciever().equalsIgnoreCase("global")) {

            for (SimpUser user : userReg.getUsers()) {
                messagingTemplate.convertAndSendToUser(user.getName(), DESTINATION, messageBody.getMessage());
            }
        }    else {
            //convertAndSendToUser automatically adds the "/user/" infront of the destination string
            System.out.println("Sending message privately");
            messagingTemplate.convertAndSendToUser(userRepo.findEmailByUserName(messageBody.getReciever()), DESTINATION,
                    messageBody.getMessage());
        }
    }
}
