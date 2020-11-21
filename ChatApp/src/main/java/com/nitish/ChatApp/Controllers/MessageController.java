package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.PrivateMessage;
import com.nitish.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @Autowired
    private UserRepository userRepo;

    @MessageMapping("/public")
    @SendTo("/messages")
    public void sendMessage(PrivateMessage messageBody){
        //System.out.println("Message:"+userMessage.getMessage()+"recieved from :" + userMessage.getUsername());
        messagingTemplate.convertAndSend(messageBody.getMessage(),"/topic/generalMessages");

    }


   @MessageMapping("/private")
   public void privatelySendMessage(PrivateMessage messageBody){
        /*
        *  In the config the user stored in the SimpUser is the email address of the user
        *  Client send the username and we find the appropriate email from the database
        */
       messagingTemplate.convertAndSendToUser(userRepo.findEmailByUserName(messageBody.getReciever()),"topic/greeting",messageBody.getMessage());
   }
}
