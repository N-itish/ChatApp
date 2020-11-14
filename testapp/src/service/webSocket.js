import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {eventBus}  from '../Mediator'
const url = "http://localhost:8090/secured/room"
export default class webSocket{

    constructor(){
        this.socket = new SockJS(url)
        this.stompClient = Stomp.over(this.socket);
        this.response = "";

    }

    connect(){
        this.stompClient.connect(
            {},
            frame => {
              console.log(frame);
              console.log(this.socket._transport.url)
              this.stompClient.subscribe("/user/queue/specific-user", tick => {
                    eventBus.$emit('recievedMessage',tick.body)
              });
            },
            error => {
              console.log(error);
              this.disconnect()
            }); 
    }
    
    send(message){
        this.stompClient.send("/secured/room",JSON.stringify(message),{});
    }
    disconnect(){
        this.stompClient = null;
    }
}