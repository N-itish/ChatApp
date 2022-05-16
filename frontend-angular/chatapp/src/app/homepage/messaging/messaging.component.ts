import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service.';
import { RecieversStore } from 'src/app/services/recievers-store.service';
import { MessageStore } from '../../services/message-store.service';
import { WebSocketService } from '../../services/websocket.service';
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
    private groupService: GroupService
    ) { }
  ngOnInit(): void {
    this.webSocketService.connect();
    this.messageStore.recievedMessage.subscribe(
      (message:string)=>{
        this.messageList.push(new MessageBox(message,new Date()))
      }
    )
  }

  sendMessage()
  { 
    if(this.recieverStore.getRecievers.length > 2){
      alert('please create a group first');
    }else{ 
       this.groupService.addGroup('');
    }
    // this.webSocketService.send(new Message(this.recieverStore.getRecievers,this.message,"TEXT",null));  
  }

  clearMessages(){
    this.messageList = [];
  }
}
