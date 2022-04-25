package com.nitish.ChatApp.Interceptor;

import com.nitish.ChatApp.Components.WebSocketAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WebSocketInterceptor implements ChannelInterceptor {

    @Autowired
    private JwtDecoder jwtDecoder;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor stompHeader =  MessageHeaderAccessor.getAccessor(message,StompHeaderAccessor.class);
        if(StompCommand.CONNECT.equals(stompHeader.getCommand())){
            List<String> authorization = stompHeader.getNativeHeader("X-Authorization");
            String accessToken = authorization.get(0).split(" ")[1];
            Jwt jwt = jwtDecoder.decode(accessToken);
            JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
            Authentication authentication = converter.convert(jwt);
            System.out.println(authentication);
            stompHeader.setUser(authentication);
        }
        return message;
    }
}
