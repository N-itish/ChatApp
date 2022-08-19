
import { Component, OnInit, Inject } from '@angular/core';
import { WebSocketService } from '../shared/websocket.service';
import { OktaAuth} from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor( @Inject(OKTA_AUTH) public oktaAuth:OktaAuth,
  private groupService: GroupService,
  private websocketService: WebSocketService) { }
  
  async ngOnInit() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      //storing the current user in the recievers list
      this.groupService.sender = userClaims.preferred_username as string;
      this.groupService.addReciever(userClaims.preferred_username as string);
    }


    //opening the websocket
    this.websocketService.connect();
  }
    
}


