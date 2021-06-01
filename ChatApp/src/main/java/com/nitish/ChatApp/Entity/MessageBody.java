package com.nitish.ChatApp.Entity;

import org.springframework.stereotype.Component;

@Component
public class MessageBody {
    String sender;
    String reciever;
    String message;
    String messageType;

    public MessageBody(){}
    public MessageBody(String sender, String reciever, String message, String messageType){
        this.sender = sender;
        this.reciever = reciever;
        this.message = message;
        this.messageType = messageType;

    }

    public String getSender() {
        return sender;
    }

    @Override
    public String toString() {
        return "PrivateMessage{" +
                "sender='" + sender + '\'' +
                ", reciever='" + reciever + '\'' +
                ", message='" + message + '\'' +
                ", messageType='" + messageType + '\'' +
                '}';
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReciever() {
        return reciever;
    }

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
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

}
