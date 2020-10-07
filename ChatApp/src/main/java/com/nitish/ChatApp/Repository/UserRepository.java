package com.nitish.ChatApp.Repository;

import com.nitish.ChatApp.Entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User,Integer> {
}
