package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.UserData;
import com.nitish.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class UserControlller {
    @Autowired
    private UserRepository userRepo;

    @RequestMapping(value = "/get",method = RequestMethod.GET)
    public List<UserData> userList(){
        return userRepo.findAll();
    }

    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public void updateUser (@ModelAttribute UserData user){
        userRepo.save(user);
    }

    @RequestMapping(value = "/getUsername",method = RequestMethod.GET)
    public List<String> getUserNames(){
        return userRepo.findUserNames();
    }

    //spring boot will authenticate the user, this is for response data only
    @RequestMapping(value = "/login",method =RequestMethod.POST)
    public Boolean loginUser(){
        return true;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerUser(@ModelAttribute UserData user){
        userRepo.save(user);
        return "user registered";
    }

}
