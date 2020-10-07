package com.nitish.ChatApp;

import com.nitish.ChatApp.Entity.User;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class Controlller {
    @RequestMapping(value = "/get",method = RequestMethod.GET)
    public User userList(){
        User user = new User("Nitish","Admin");
        return user;
    }

    @RequestMapping(value = "/login",method =RequestMethod.POST)
    public String loginUser(@ModelAttribute User user){

        return "Works";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerUser(@ModelAttribute User user){
        System.out.println(user.getDob());
        return "Works";
    }

}
