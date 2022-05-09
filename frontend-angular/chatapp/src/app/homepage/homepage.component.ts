
import { Component, OnInit, Inject } from '@angular/core';
import { GroupStore } from '../services/group-store.service';
import { MessageStore } from '../services/message-store.service';
import { RecieversStore } from '../services/recievers-store.service';
import { WebSocketService } from '../services/websocket.service';
import { OktaAuth} from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[WebSocketService,MessageStore,RecieversStore,GroupStore]
})
export class HomepageComponent implements OnInit {
  constructor( @Inject(OKTA_AUTH) public oktaAuth:OktaAuth,private recieverStore: RecieversStore) { }
  
  async ngOnInit() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      //storing the current user in the recievers list
      this.recieverStore.addReciever(userClaims.preferred_username as string);
      console.log(userClaims.preferred_username);
      console.log(this.recieverStore.getRecievers);
    }
  }
    
}


