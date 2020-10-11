package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.UserData;
import com.nitish.ChatApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class UserControlller {
    @Autowired
    private UserRepository userRepo;

    @RequestMapping(value = "/get",method = RequestMethod.GET)
    public List<UserData> userList(){
        return userRepo.findAll();
    }

    @RequestMapping(value = "/login",method =RequestMethod.POST)
    public Boolean loginUser(@ModelAttribute UserData user){
        ArrayList<UserData> userData = (ArrayList) userRepo.findAll();
        for(UserData data: userData){
            if(data.getEmail().equalsIgnoreCase(user.getEmail()) &&
                                data.getPassword().equalsIgnoreCase(user.getPassword())
            )
            {
                return true;
            }
        }
        //failed to authenticate
        return false;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerUser(@ModelAttribute UserData user){
        userRepo.save(user);
        return "user registered";
    }

}
