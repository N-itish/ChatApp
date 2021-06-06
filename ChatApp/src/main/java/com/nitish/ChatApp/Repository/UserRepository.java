package com.nitish.ChatApp.Repository;

import com.nitish.ChatApp.Entity.UserData;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<UserData,Integer> {

    List<UserData> findAll();
    UserData findByEmail(String email);

    @Query("Select a.userName from UserData a where LOWER(a.email) = LOWER(:email)")
    String findUserNameByEmail(@Param("email") String email);

    @Query("Select userName from UserData")
    List<String> findUserNames();

    @Query("Select a.email from UserData a where LOWER(a.userName) = LOWER(:userName)")
    String findEmailByUserName(@Param("userName") String userName);


}
