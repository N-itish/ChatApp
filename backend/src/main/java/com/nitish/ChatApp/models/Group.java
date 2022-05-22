package com.nitish.ChatApp.models;

import org.springframework.stereotype.Component;

@Component
public class Group {
    private String[] recievers;
    private String groupName;
    private String groupId;
    private String message;
    public Group(){}
    public Group(String[] recievers, String groupName, String groupId,String message) {
        this.recievers = recievers;
        this.groupName = groupName;
        this.groupId = groupId;
        this.message = message;
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
