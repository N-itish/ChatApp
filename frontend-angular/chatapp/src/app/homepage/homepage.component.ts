
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[WebSocketService]
})
export class HomepageComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
    
}


