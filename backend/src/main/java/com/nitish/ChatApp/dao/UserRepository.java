package com.nitish.ChatApp.dao;

import com.nitish.ChatApp.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users,Integer> {

    Users findByEmail(String email);

    @Query("Select a.userName from Users a where LOWER(a.email) = LOWER(:email)")
    String findUserNameByEmail(@Param("email") String email);

    @Query("Select userName from Users")
    List<String> findUserNames();

    @Query("Select a.email from Users a where LOWER(a.userName) = LOWER(:userName)")
    String findEmailByUserName(@Param("userName") String userName);


}
