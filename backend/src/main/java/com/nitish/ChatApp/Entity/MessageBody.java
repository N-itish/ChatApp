package com.nitish.ChatApp.Entity;

import org.springframework.stereotype.Component;

@Component
public class MessageBody {
    String[] reciever;
    String message;
    String messageType;

    public MessageBody(){}
    public MessageBody(String[] reciever, String message, String messageType){
        this.reciever = reciever;
        this.message = message;
        this.messageType = messageType;

    }

    @Override
    public String toString() {
        return "PrivateMessage{" +
                ", reciever='" + reciever + '\'' +
                ", message='" + message + '\'' +
                ", messageType='" + messageType + '\'' +
                '}';
    }


    public String[] getReciever() {
        return reciever;
    }

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public void setReciever(String[] reciever) {
        this.reciever = reciever;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
