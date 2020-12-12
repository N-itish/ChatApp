package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.PrivateMessage;
import com.nitish.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;

import java.util.stream.Stream;

@Controller
public class MessageController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private SimpUserRegistry userReg;

    @Autowired
    private UserRepository userRepo;


   @MessageMapping("/private")
   public void privatelySendMessage(PrivateMessage messageBody){
        /*
        *  In the config the user stored in the SimpUser is the email address of the user
        *  Client send the receivers username and we find the appropriate email from the database
        *  If no receivers name given then send message to all users in SimpUser
        */
       
       String destination  = "topic/greeting";

       if(messageBody.getReciever().equalsIgnoreCase("")){

            for(SimpUser user: userReg.getUsers()){
                messagingTemplate.convertAndSendToUser(user.getName(),destination,messageBody.getMessage());
            }
       }else {
           //convertAndSendToUser automatically adds the "/user/" infront of the destination string
           System.out.println("Sending message privately");
           messagingTemplate.convertAndSendToUser(userRepo.findEmailByUserName(messageBody.getReciever()), destination, messageBody.getMessage());
       }
   }

   @MessageMapping("/videoStream")
   public void videoStream(Stream stream){
       System.out.println("binary data recieved");
   }
}
