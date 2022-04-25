import {Stomp} from '@stomp/stompjs';
import sockjs from 'sockjs-client/dist/sockjs';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Message } from '../shared/message.model';
import { MessageStore } from './message-store.service';

@Injectable()
export class WebSocketService{
    endPoint: string = 'http://localhost:9001/chatApp-webSocket-endpoint'
    topic:string  = '/user/topic/greeting'
    stompClient: any;

    constructor(@Inject(OKTA_AUTH) private oktaAuth:OktaAuth,private messageStore: MessageStore){

    }

    connect(){
        const accessToken = this.oktaAuth.getAccessToken();
        let webSocket = new sockjs(this.endPoint);
        let self = this;
        this.stompClient = Stomp.over(webSocket);
        
        this.stompClient.connect({"X-Authorization":"Bearer "+accessToken}, function(frame:any){
            console.log(frame);
            self.stompClient.subscribe(self.topic,function(event:any){
                self.onMessageRecieved(event.body);
            })
        },function(error:any){
            console.log('This is from the connect method');
            console.log(error);
        })
        console.log(this.stompClient);
    }

    disconnect(){
        if(this.stompClient !== null){
            this.stompClient.disconnect();
        }
    }

    send(message:Message){
        this.stompClient.send("/app/private",{},JSON.stringify(message))
    }

    onMessageRecieved(message:string){
        this.messageStore.recievedMessage.emit(message);
    }
}