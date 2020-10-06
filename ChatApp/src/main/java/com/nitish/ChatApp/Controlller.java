package com.nitish.ChatApp;

import com.nitish.ChatApp.POJO.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class Controlller {
    @RequestMapping(value = "/get",method = RequestMethod.GET)
    public User userList(){
        User user = new User("Nitish","Admin");
        return user;
    }
}
