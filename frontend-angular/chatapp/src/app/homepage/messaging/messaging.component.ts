import { Component, OnInit } from '@angular/core';
import { groupService } from 'src/app/services/group.service';
import { RecieversStore } from 'src/app/services/recievers-store.service';
import { Group } from 'src/app/shared/group.model';
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
  messageList: MessageBox[] = []
  constructor(
    private webSocketService: WebSocketService,
    private messageStore:MessageStore, 
    private recieverStore: RecieversStore,
    private groupService: groupService,
    ) { }
  ngOnInit(): void {
    this.webSocketService.connect();

    //show the message in the message area
    this.messageStore.recievedMessage.subscribe(
      (message:string)=>{
        this.messageList.push(new MessageBox(message,new Date()))
      });
  }

  sendMessageToServer(currentGroup:Group) {
      currentGroup.message = this.message;
      this.webSocketService.send(currentGroup);
  }

  sendMessage()
  { 

    //issue how to check if we want to send new group

    console.log("messaging component: "+ this.recieverStore.getRecievers);
    let group:Group = new Group(this.recieverStore.getRecievers,"testGroup",null,this.message);

    
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
    // if(this.recieverStore.getRecievers.length > 2){   
    //     alert('please create a group first');
    // } 
    // //gaurd so that if no other reciever is selected except self new group is not created
    // else if(this.recieverStore.getRecievers.length > 1 && this.recieverStore.getRecievers.length < 3){
    //   this.groupService.addGroupUsingName("");
    // }    
  }
  

  clearMessages(){
    this.messageList = [];
  }
}
