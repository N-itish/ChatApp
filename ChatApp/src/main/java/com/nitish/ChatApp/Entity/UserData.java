package com.nitish.ChatApp.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="userdata")
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    private int userId;
    @Column(name = "userName")
    private String userName;
    @Column(name = "email")
    private String email;
    @Column (name = "password")
    private String password;
    @Column(name = "role")
    private String role;
    @Column(name = "gender")
    private String gender;
    @Temporal(TemporalType.DATE)
    private Date dob;
    public UserData(){

    }
    public UserData(String userName, String role){
        this.userName = userName;
        this.role = role;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
