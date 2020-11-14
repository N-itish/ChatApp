package com.nitish.ChatApp.Entity;

public class PrivateMessage {
    String sessionId;
    String message;

    public PrivateMessage(String sessionId,String message){
        this.sessionId = sessionId;
        this.message = message;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
