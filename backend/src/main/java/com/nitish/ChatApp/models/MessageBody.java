package com.nitish.ChatApp.models;

import org.springframework.stereotype.Component;

@Component
public class MessageBody {
    private String message;
    private String messageType;
    private Group group;

    public MessageBody(){}


    public MessageBody(String message, String messageType, Group group){
        this.message = message;
        this.messageType = messageType;
        this.group = group;
    }

    public Group getGroup() {return group;}

    public String getMessageType() {
        return messageType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
