import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {eventBus}  from '../Mediator'
const url = "http://localhost:8090/gs-guide-websocket"
export default class webSocket{
    constructor(){
        this.stompClient = Stomp.over(new SockJS(url));
        this.response = "";

    }

    connect(){
        this.stompClient.connect(
            {},
            frame => {
              console.log(frame);
              this.stompClient.subscribe("/messages", tick => {
                    eventBus.$emit('recievedMessage',tick.body)
              });
            },
            error => {
              console.log(error);
              this.disconnect()
            }); 
    }
    
    send(message){
        this.stompClient.send("/app/sendMessage",JSON.stringify(message),{});
    }
    disconnect(){
        this.stompClient = null;
    }
}