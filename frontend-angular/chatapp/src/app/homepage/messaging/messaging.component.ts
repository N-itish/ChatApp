import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/shared/group.model';
import { MessageStore } from '../../services/message-store.service';
import { WebSocketService } from '../../shared/websocket.service';
import { MessageBox } from './message-box.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  message:string ='';
  messageList: MessageBox[] = []
  constructor(
    private webSocketService: WebSocketService,
    private messageStore:MessageStore, 
    private groupService: GroupService,
    ) { }
  ngOnInit(): void {

    //show the message in the message area
    this.messageStore.recievedMessage.subscribe(
      (message:string)=>{
        this.messageList.push(new MessageBox(message,new Date()))
      });
  }

  sendMessageToServer(currentGroup:Group) {
      currentGroup.message = this.message;
      console.log(currentGroup);
      this.webSocketService.send(currentGroup);
  }

  sendMessage()
  { 

    let group:Group = new Group(this.groupService.recievers,"testGroup",null,this.message,'');

    
    /*
      checking if the recievers are same or differnt 
      if same means that the user is trying to send message to same perseon
      if different then user is sending message to new group 
    
      */
    const newGroupRecievers = group.recievers.slice().sort();
    const currentGroupRecievers = this.groupService.currentGroup?.recievers as string[];


    let recieverNotChanged: boolean = false
    
    if(this.groupService.currentGroup !== undefined){
       recieverNotChanged = currentGroupRecievers.length === newGroupRecievers.length && 
       currentGroupRecievers.slice().sort().every(function(value, index) {
        return value === newGroupRecievers[index];})
      }
    if(recieverNotChanged) {
      group = this.groupService.currentGroup as Group;
    }   


    this.groupService.createNewGroup(group).subscribe(
      (data)=>{
        this.sendMessageToServer(this.groupService.currentGroup as Group);
      }
    );
  }
  

  clearMessages(){
    this.messageList = [];
  }
}
