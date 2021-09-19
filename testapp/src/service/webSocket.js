import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Store from '../store';


//Server url taken from the .env file
const url = process.env.VUE_APP_SERVER_API + "gs-guide-websocket";
var headers;
export default class webSocket{
    static headers = [];
    constructor(){
        this.socket = new SockJS(url);
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.debug = function(){};
    }
    setAuth(username,password){
       headers = {
           login: username,
           passcode: password
       }
    }
    connect(){
        this.stompClient.connect(
            headers,  
            () => {
              this.stompClient.subscribe("/user/topic/greeting", tick => {
                    //console.log(tick);
                    if(tick.body.split(':')[0] == 'callRequest' || tick.body.split(':')[0] == 'callAccepted'){
                        Store.commit('setCommand',tick.body.split(':')[1])
                        console.log(tick.body.split(':'))
                    }else
                    {
                        Store.commit('setMessage',tick.body); 
                    }
                   // console.log(Store.getters.webSockRtrnData); 
              });
            },
            err => {
              this.disconnect(err)
            }); 
    }

    send(message){
        this.stompClient.send("/app/private",JSON.stringify(message),{});
    }

    disconnect(err){
        console.log('disconnected due to error :'+ err);
        this.stompClient = null;
    }
}