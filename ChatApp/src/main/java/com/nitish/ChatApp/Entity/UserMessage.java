package com.nitish.ChatApp.Entity;

public class UserMessage {
    private String message;
    private String username;
    public void UserMessage(){}
    public void UserMessage(String username,String message){
        this.message = message;
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
