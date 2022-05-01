
import { Component, OnInit } from '@angular/core';
import { GroupStore } from '../services/group-store.service';
import { MessageStore } from '../services/message-store.service';
import { RecieversStore } from '../services/recievers-store.service';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[WebSocketService,MessageStore,RecieversStore,GroupStore]
})
export class HomepageComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
    
}


