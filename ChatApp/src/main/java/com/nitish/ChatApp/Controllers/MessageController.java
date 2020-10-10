package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.UserMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class MessageController {
    @MessageMapping("/sendMessage")
    @SendTo("/messages")
    public UserMessage sendMessage(UserMessage userMessage){
        System.out.println("Message:"+userMessage.getMessage()+"recieved from :" + userMessage.getUsername());
        return userMessage;
    }
}
