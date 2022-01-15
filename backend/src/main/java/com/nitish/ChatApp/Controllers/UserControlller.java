package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.UserData;
import com.nitish.ChatApp.Repository.UserRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping(value = "/user",method = RequestMethod.GET)
public class UserControlller {
    @Autowired
    private UserRepository userRepo;

    //only returning the user names not the entire details
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
    @RequestMapping(value = "/image",method = RequestMethod.GET)
    public String getImage(){

        String imageLocation = "Images/Image1.jpg";
        //System.out.println(getClass().getClassLoader().getResourceAsStream(imageLocation));
        InputStream input = getClass().getClassLoader().getResourceAsStream(imageLocation);
        byte[] imageBytes = new byte[0];
        try {
            imageBytes = IOUtils.toByteArray(input);
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }
        byte[] Encoded = Base64Utils.encode(imageBytes);
        return new String(Encoded);
    }

}
