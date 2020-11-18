import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {eventBus}  from '../Mediator';
const url = "http://localhost:8090/gs-guide-websocket";
var headers;
export default class webSocket{
    static headers = [];
    constructor(){
        this.socket = new SockJS(url);
        this.stompClient = Stomp.over(this.socket);
        this.response = "";
        
    }
    setAuth(username,password){
       headers = {
           login: username,
           passcode: password
       }
    }
    connect(){
        //console.log("Inside the webSocket"+headers);
        this.stompClient.connect(
            headers,
            frame => {
              console.log(frame);
              console.log(this.socket._transport.url)
              this.stompClient.subscribe("/user/topic/greeting", tick => {
                    eventBus.$emit('recievedMessage',tick.body)
              });
            },
            error => {
              console.log(error);
              this.disconnect()
            }); 
    }
    
    send(message){
        this.stompClient.send("/app/private",JSON.stringify(message),{});
    }
    disconnect(){
        this.stompClient = null;
    }
}