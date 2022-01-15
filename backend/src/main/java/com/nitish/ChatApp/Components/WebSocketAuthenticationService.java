package com.nitish.ChatApp.Components;

import com.nitish.ChatApp.Entity.Users;
import com.nitish.ChatApp.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import java.util.Collections;

@Component
public class WebSocketAuthenticationService {
    @Autowired
    private UserRepository userRepo;

    public UsernamePasswordAuthenticationToken authenticateUser(String username,String password) throws
            AuthenticationException {
        Users user = userRepo.findByEmail(username);
        if(username == null || password == null){
            throw new AuthenticationCredentialsNotFoundException("UserName or password is empty");
        }

        if(user == null){
            throw new BadCredentialsException("user was not found!!");
        }
        return new UsernamePasswordAuthenticationToken(username,null,
                Collections.singleton(
                        (GrantedAuthority) () -> "USER"
                )
        );

    }
}

