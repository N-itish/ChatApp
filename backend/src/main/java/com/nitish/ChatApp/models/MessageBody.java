package com.nitish.ChatApp.models;

import org.springframework.stereotype.Component;

@Component
public class MessageBody {
    String[] receivers;
    String message;
    String messageType;
    String groupId;

    public MessageBody(){}
    public MessageBody(String[] receivers, String message, String messageType,String groupId){
        this.receivers = receivers;
        this.message = message;
        this.messageType = messageType;
        this.groupId = groupId;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String[] getRecievers() {
        return receivers;
    }

    public String getMessageType() {
        return messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public void setRecievers(String[] recievers) {
        this.receivers = recievers;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
