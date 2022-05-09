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
      groupId=>{
        this.groupId = groupId;
      }
    )
  }

  sendMessage()
  {  
    console.log(this.groupId);
    this.webSocketService.send(new Message(this.recieverStore.getRecievers,this.message,"TEXT",this.groupId));  
  }

  clearMessages(){
    this.messageList = [];
  }
}
