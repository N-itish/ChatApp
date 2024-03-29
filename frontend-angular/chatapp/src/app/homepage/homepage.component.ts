
import { Component, OnInit, Inject } from '@angular/core';
import { WebSocketService } from '../shared/websocket.service';
import { OktaAuth} from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import { GroupService } from '../services/group.service';
import { CallStatus } from '../shared/call-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  groupId:string = '';
  constructor( @Inject(OKTA_AUTH) public oktaAuth:OktaAuth,
  private groupService: GroupService,
  private websocketService: WebSocketService,
  private callStatusService: CallStatus,
  private router:Router) { }
  
  async ngOnInit() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      //storing the current user in the recievers list
      this.groupService.sender = userClaims.preferred_username as string;
      this.groupService.addReciever(userClaims.preferred_username as string);
    }

    this.groupService.currentGroup?.subscribe((result)=>{
      this.groupId = result.groupId as string;
    })

    this.callStatusService.callStatus.subscribe((result)=>{
      if(result){
        this.router.navigate(['/videoCall',this.groupId]);
      }
    })

      //connecting to the websocket 
      this.websocketService.connect();
  }
    
}


