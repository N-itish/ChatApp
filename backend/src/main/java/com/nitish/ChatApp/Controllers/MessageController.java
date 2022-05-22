package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.models.Group;
import com.nitish.ChatApp.Handlers.Handler;
import com.nitish.ChatApp.Handlers.Impl.TextHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MessageController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    private Handler messageHandler;
    /*
     *  In the config the user stored in the SimpUser is the email address of the user
     *  Client send the receivers username and we find the appropriate email from the database
     *  If no receivers name given then send message to all users in SimpUser
     */
   @MessageMapping("/private")
   public void privatelySendMessage(@RequestBody Group groupMessage) {
       messageHandler = new TextHandler(messagingTemplate,groupMessage);
       messageHandler.deliverMessage();
   }
}
