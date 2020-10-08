package com.nitish.ChatApp.Repository;

import com.nitish.ChatApp.Entity.UserData;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserData,Integer> {
}
