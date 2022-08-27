import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { WebSocketService } from '../shared/websocket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(@Inject(OKTA_AUTH) public oktaAuth:OktaAuth,private websocket:WebSocketService) { }

  ngOnInit(): void {
  }

  async logout(){
    await this.oktaAuth.signOut();
    this.websocket.disconnect();
    console.log('logout successful!!');
  }

}
