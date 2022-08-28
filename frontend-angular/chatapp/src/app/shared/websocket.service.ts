import {Stomp} from '@stomp/stompjs';
import sockjs from 'sockjs-client/dist/sockjs';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { MessageStore } from '../services/message-store.service';
import { Group } from './group.model';
import { GroupService } from '../services/group.service';
import { CallStatus } from './call-status.service';

@Injectable({providedIn:'root'})
export class WebSocketService{
    endPoint: string = 'http://localhost:9001/chatApp-webSocket-endpoint'
    topic:string  = '/user/topic/greeting'
    stompClient: any;

    constructor(@Inject(OKTA_AUTH) private oktaAuth:OktaAuth,
    private messageStore: MessageStore
    ,private groupService:GroupService,
    private callStatusService: CallStatus){

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
        this.stompClient.send("/app/private",{},JSON.stringify(message));
        console.log('memssage sent');
    }

    parseMessage(serverMessage:any){
        const serverGroup = JSON.parse(serverMessage);
        
        //updating the current group
        this.groupService.currentGroup?.next(serverGroup);
        this.groupService.addUniqueGroup(serverGroup as Group);
     
        //updating the recievers
        this.groupService.addRecievers(serverGroup.recievers as string[]);
        this.messageStore.recievedMessage.next(serverGroup.message as string);

        //checking if message is a call alert 
        //checking callstatus to make sure it is not person calling
        //the person calling will set this flag to true in the video call component
        if(serverGroup.message === 'calling' && this.callStatusService.callStatus.getValue() === false){
           console.log('setting the call status to true')
           this.callStatusService.callStatus.next(true);
        }


   
    }
}