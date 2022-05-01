import { Component, OnInit } from '@angular/core';
import { GroupStore } from 'src/app/services/group-store.service';
import { RecieversStore } from 'src/app/services/recievers-store.service';
import { MessageStore } from '../../services/message-store.service';
import { WebSocketService } from '../../services/websocket.service';
import { Message } from '../../shared/message.model';
import { MessageBox } from './message-box.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  message:string ='';
  groupId:string|null = null;
  messageList: MessageBox[] = []
  constructor(
    private webSocketService: WebSocketService,
    private messageStore:MessageStore, 
    private recieverStore: RecieversStore,
    private groupStore: GroupStore) { }
  ngOnInit(): void {
    this.webSocketService.connect();
    this.messageStore.recievedMessage.subscribe(
      (message:string)=>{
        this.messageList.push(new MessageBox(message,new Date()))
      }
    )

    this.groupStore.groupId.subscribe(
      (groupId:string)=>{
        this.groupId = groupId;
      }
    )
  }

  sendMessage()
  {
    
    //TODO: try to create websocket session if session is not created before sending data
    //console.log(this.webSocketService)
    console.log(this.groupId);
    console.log(this.recieverStore.getRecievers);

    this.webSocketService.send(new Message(this.recieverStore.getRecievers,this.message,"TEXT",this.groupId))
    // if(this.recieverStore.getRecievers.length > 0){
    //   this.webSocketService.send(new Message(this.recieverStore.getRecievers,this.message,"TEXT"))
    // }
    
  }

  clearMessages(){
    this.messageList = [];
  }
}
