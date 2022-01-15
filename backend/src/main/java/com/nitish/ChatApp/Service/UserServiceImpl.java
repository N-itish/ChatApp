package com.nitish.ChatApp.Service;

import com.nitish.ChatApp.Entity.Users;
import com.nitish.ChatApp.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserServiceImpl implements UserService{

    private UserRepository userRepo;

    @Autowired
    public UserServiceImpl(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    @Override
    public List<Users> getAll() {
        return userRepo.findAll();
    }

    @Override
    public void updateUser(Users user) {
        userRepo.save(user);
    }

    @Override
    public void saveUser(Users user) {
        userRepo.save(user);
    }
}
