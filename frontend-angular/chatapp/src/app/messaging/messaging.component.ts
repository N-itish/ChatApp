import { Component, OnInit } from '@angular/core';
import { MessageBox } from './message-box.model';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  message:string ='';
  messageList: MessageBox[] = []
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage()
  {
    this.messageList.push(
      new MessageBox(this.message,new Date())
    )
  }

  clearMessages(){
    this.messageList = [];
  }
}
