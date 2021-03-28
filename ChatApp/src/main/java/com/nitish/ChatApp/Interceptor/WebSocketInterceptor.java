package com.nitish.ChatApp.Interceptor;

import com.nitish.ChatApp.Services.WebSocketAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class WebSocketInterceptor implements ChannelInterceptor {
    private static final String USERNAME_HEADER = "login";
    private static final String PASSWORD_HEADER = "passcode";
    private WebSocketAuthenticationService webSocketAuth;

    @Autowired
    public WebSocketInterceptor(WebSocketAuthenticationService webSocketAuth){
        this.webSocketAuth = webSocketAuth;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor stompHeader =  MessageHeaderAccessor.getAccessor(message,StompHeaderAccessor.class);
        if(StompCommand.CONNECT == stompHeader.getCommand()){
            String username = stompHeader.getFirstNativeHeader(USERNAME_HEADER);
            String passcode = stompHeader.getFirstNativeHeader(PASSWORD_HEADER);
            UsernamePasswordAuthenticationToken userToken = webSocketAuth.authenticateUser(username,passcode);
            stompHeader.setUser(userToken);
        }
        return message;
    }
}
