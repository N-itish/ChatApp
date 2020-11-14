package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.PrivateMessage;
import com.nitish.ChatApp.Entity.UserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.DefaultSimpUserRegistry;

@Controller
public class MessageController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private DefaultSimpUserRegistry userRegistry;

    @MessageMapping("/sendMessage")
    @SendTo("/messages")
    public String sendMessage(UserMessage userMessage){
        System.out.println("Message:"+userMessage.getMessage()+"recieved from :" + userMessage.getUsername());
        return userMessage.getMessage();
    }

   @MessageMapping("/secured/room")
    public void sendPrivateMessage(PrivateMessage messageBody){
        for (SimpUser user: userRegistry.getUsers()){
            System.out.println(user.getName());
        };
        messagingTemplate.convertAndSendToUser(messageBody.getSessionId(),"/user/queue/specific-user",messageBody.getMessage());

   }
}
