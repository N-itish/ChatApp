package com.nitish.ChatApp.Entity;

import org.springframework.stereotype.Component;

@Component
public class MessageBody {
    String[] recievers;
    String message;
    String messageType;

    public MessageBody(){}
    public MessageBody(String[] recievers, String message, String messageType){
        this.recievers = recievers;
        this.message = message;
        this.messageType = messageType;

    }

    @Override
    public String toString() {
        return "PrivateMessage{" +
                ", reciever='" + recievers + '\'' +
                ", message='" + message + '\'' +
                ", messageType='" + messageType + '\'' +
                '}';
    }


    public String[] getRecievers() {
        return recievers;
    }

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public void setRecievers(String[] recievers) {
        this.recievers = recievers;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
