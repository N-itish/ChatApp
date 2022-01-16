package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.Users;
import com.nitish.ChatApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }


    @GetMapping("/users")
    public List<Users> userList(){
        return userService.getAll();
    }

    @PutMapping("/users")
    public void updateUser (@RequestBody Users user){
        userService.updateUser(user);
    }

    @PostMapping("/user")
    public String saveUser(@RequestBody Users user){
        userService.saveUser(user);
        return "user registered";
    }

    @PostMapping("/login")
    public Boolean loginUser(){
        return true;
    }

    @GetMapping("/test")
    public String hello(){
        return "Hello";
    }
}
