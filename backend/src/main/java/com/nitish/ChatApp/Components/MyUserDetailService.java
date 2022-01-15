package com.nitish.ChatApp.Components;

import com.nitish.ChatApp.Entity.Users;
import com.nitish.ChatApp.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class MyUserDetailService implements UserDetailsService{
    @Autowired
    private UserRepository userRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepo.findByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException(email);
        }
        return new MyPrincipal(user);
    }
}
