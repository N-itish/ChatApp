package com.nitish.ChatApp.Service;

import com.nitish.ChatApp.Entity.Users;

import java.util.List;

public interface UserService {
    List<Users> getAll();
    void updateUser(Users user);
    void saveUser(Users user);
}
