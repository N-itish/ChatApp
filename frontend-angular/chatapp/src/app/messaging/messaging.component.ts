import { Component, OnInit } from '@angular/core';
import { MessageStore } from '../services/message-store.service';
import { WebSocketService } from '../services/websocket.service';
import { Message } from '../shared/message.model';
import { MessageBox } from './message-box.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  message:string ='';
  messageList: MessageBox[] = []
  constructor(private webSocketService: WebSocketService,private messageStore:MessageStore) { }
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
    //TODO: try to create websocket session if session is not created before sending data
    //console.log(this.webSocketService)
    this.webSocketService.send(new Message(["snoopy@luv2code.com"],this.message,"TEXT"));

  }

  clearMessages(){
    this.messageList = [];
  }
}
