package com.nitish.ChatApp.models;

import org.springframework.stereotype.Component;

@Component
public class Group {
    private String[] recievers;
    private String groupName;
    private String groupId;
    private String message;
    private String sender;
    public Group(){}
    public Group(String[] recievers, String groupName, String groupId,String message,String sender) {
        this.recievers = recievers;
        this.groupName = groupName;
        this.groupId = groupId;
        this.message = message;
        this.sender = sender;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String[] getRecievers() {
        return recievers;
    }

    public void setRecievers(String[] recievers) {
        this.recievers = recievers;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
