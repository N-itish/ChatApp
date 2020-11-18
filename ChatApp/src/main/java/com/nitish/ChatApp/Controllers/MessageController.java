package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.PrivateMessage;
import com.nitish.ChatApp.Entity.UserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.DefaultSimpUserRegistry;

@Controller
public class MessageController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/public")
    @SendTo("/messages")
    public void sendMessage(PrivateMessage messageBody){
        //System.out.println("Message:"+userMessage.getMessage()+"recieved from :" + userMessage.getUsername());
        messagingTemplate.convertAndSend(messageBody.getMessage(),"/topic/generalMessages");

    }


   @MessageMapping("/private")
   public void privatelySendMessage(PrivateMessage messageBody){
       messagingTemplate.convertAndSendToUser(messageBody.getSessionId(),"topic/greeting",messageBody.getMessage());
   }
}
