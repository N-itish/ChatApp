import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
export class WebSocketService{
    endPoint: string = 'http://localhost:9001/gs-guide-websocket'
    topic:string  = '/user/topic/greetings'
    stompClient: any;
    connect(){
        let webSocket = new SockJS(this.endPoint);
        let self = this;
        this.stompClient = Stomp.over(webSocket);
        
        this.stompClient.connect({}, function(frame:any){
            console.log(frame);
            self.stompClient.subscribe(self.topic,function(event:any){
                self.onMessageRecieved(event);
            })
        })
    }

    disconnect(){
        if(this.stompClient !== null){
            this.stompClient.disconnect();
        }
    }

    send(message:string){
        this.stompClient.send("/app/private",{},JSON.stringify(message))
    }

    onMessageRecieved(message:any){
        console.log(message);
    }
}