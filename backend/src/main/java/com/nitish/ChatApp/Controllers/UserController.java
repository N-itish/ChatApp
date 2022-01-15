package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.Users;
import com.nitish.ChatApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    //only returning the user names not the entire details
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

}
