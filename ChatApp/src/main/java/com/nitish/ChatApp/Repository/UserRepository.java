package com.nitish.ChatApp.Repository;

import com.nitish.ChatApp.Entity.UserData;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<UserData,Integer> {
    @Override
    List<UserData> findAll();

    @Query("Select userName from UserData")
    List<String> findUserNames();

    UserData findByEmail(String email);
}
