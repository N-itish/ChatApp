import { Component, OnInit } from '@angular/core';
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
  constructor(private webSocketService: WebSocketService) { }
  ngOnInit(): void {
    this.webSocketService.connect();
  }

  sendMessage()
  {
    if(this.webSocketService.stompClient === null){
      this.webSocketService.connect();
    }
    //this.webSocketService.send(new Message(["snoopy@luv2code.com"],this.message,"TEXT"));
    // this.messageList.push(
    //   new MessageBox(this.message,new Date())
    // )
  }

  clearMessages(){
    this.messageList = [];
  }
}
