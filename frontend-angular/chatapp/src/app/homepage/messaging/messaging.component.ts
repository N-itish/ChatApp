import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service.';
import { RecieversStore } from 'src/app/services/recievers-store.service';
import { Group } from 'src/app/shared/group.model';
import { Message } from 'src/app/shared/message.model';
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
    let messageGroup:Group|undefined;
    if(this.recieverStore.getRecievers.length > 2 && !this.groupService.currentGroup){   
        alert('please create a group first');
    } 
    //gaurd so that if no other reciever is selected except self new group is not created
    else if(this.recieverStore.getRecievers.length > 1){
        this.groupService.addGroupUsingName('');
    }
    messageGroup = this.groupService.currentGroup as Group;
    messageGroup.message = this.message;
    this.webSocketService.send(messageGroup as Group);
  }

  clearMessages(){
    this.messageList = [];
  }
}
