import { Message } from "@/models/Message";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {store} from '../store';


//Server url taken from the .env file
const url:string = process.env.VUE_APP_SERVER_API + "gs-guide-websocket";
let headers :AuthenticationHeaders;

export default class webSocket{
    constructor(private socket: any, private stompClient:any){
       this.Initalize();
    }

    Initalize(){
        this.socket= new SockJS(url);
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = function(){
            console.log('running debug in stompclient')
        };
    }

    setAuth(username:string ,password:string){
       headers = {
           login: username,
           passcode: password
       }
    }
    connect(){
        this.stompClient.connect(
            headers,  
            () => {
              this.stompClient.subscribe("/user/topic/greeting", (tick:any) => {
                    //console.log(tick);
                    if(tick.body.split(':')[0] == 'callRequest'){
                        store.commit('setSender',tick.body.split(':')[1])
                        //console.log(tick.body.split(':'))
                    }else if(tick.body == 'callAccepted'){
                        store.commit('setCommand','callAccepted')
                    }
                    else
                    {
                        store.commit('setMessage',tick.body); 
                    }
              });
            },
            (err:any) => {
              this.disconnect(err)
            }); 
    }

    send(message:Message){
        if(this.stompClient != null){
            this.stompClient.send("/app/private",JSON.stringify(message),{});
        }
    }

    disconnect(err:any){
        console.log('disconnected due to error :'+ err);
        this.stompClient = null;
    }
}

interface AuthenticationHeaders{
    login: string,
    passcode: string
}