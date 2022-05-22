import {Stomp} from '@stomp/stompjs';
import sockjs from 'sockjs-client/dist/sockjs';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Message } from '../shared/message.model';
import { MessageStore } from './message-store.service';
import { GroupService } from './group.service.';
import { Group } from '../shared/group.model';

@Injectable()
export class WebSocketService{
    endPoint: string = 'http://localhost:9001/chatApp-webSocket-endpoint'
    topic:string  = '/user/topic/greeting'
    stompClient: any;

    constructor(@Inject(OKTA_AUTH) private oktaAuth:OktaAuth,
    private messageStore: MessageStore
    ,private groupService:GroupService){

    }

    connect(){
        const accessToken = this.oktaAuth.getAccessToken();
        let self = this;
        this.stompClient = Stomp.over(()=>{return new sockjs(this.endPoint)});
        this.stompClient.reconnect_delay = 1000;
        
        this.stompClient.connect({"X-Authorization":"Bearer "+accessToken}, 
        (frame:any)=>{
            console.log(frame);
            self.connectionCallback();
        },(error:any)=>{
            self.errorCallback(error);
        })
        console.log(this.stompClient);
    }

    errorCallback(error:any){
        console.log('From error callback')
        console.log(error)
    }

    connectionCallback(){
       var self = this;
        this.stompClient.subscribe(this.topic,function(event:any){
            self.parseMessage(event.body);
        })
    }
    disconnect(){
        if(this.stompClient !== null){
            this.stompClient.disconnect();
        }
    }

    send(message:Group){
        console.log(message);
        this.stompClient.send("/app/private",{},JSON.stringify(message))
    }

    parseMessage(serverMessage:any){
        console.log(serverMessage)
        let returnedGroup:Group = JSON.parse(serverMessage);
        this.groupService.addGroupDirectly(returnedGroup)
        this.groupService.setSelectedGroup(returnedGroup)
        this.messageStore.recievedMessage.next(returnedGroup.message);
    }
}