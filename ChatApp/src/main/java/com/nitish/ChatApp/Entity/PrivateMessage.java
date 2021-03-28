package com.nitish.ChatApp.Entity;

public class PrivateMessage {
    String reciever;
    String message;

    public PrivateMessage(String reciever,String message){
        this.reciever = reciever;
        this.message = message;
    }

    public String getReciever() {
        return reciever;
    }

    public void setReciever(String reciever) {
        this.reciever = reciever;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "PrivateMessage{" +
                "reciever='" + reciever + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
