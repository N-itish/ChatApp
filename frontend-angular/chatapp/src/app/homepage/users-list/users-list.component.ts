import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Users } from 'src/app/shared/users.model';
import { UserService } from 'src/app/services/user-store.service';
import { RecieversStore } from 'src/app/services/recievers-store.service';
const url="http://localhost:9001/api/users";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users:Users[]= []
  selectedUsers: Users[]=[];
  searchedUser:string ='';
  constructor(
    private userService:UserService,
    private httpClient: HttpClient,
    private recieverStore: RecieversStore,
    @Inject(OKTA_AUTH) private oktaAuth:OktaAuth,
    ) { }

  ngOnInit(): void {
        //getting the list of users from backend
        //backend in turn requests okta for the userlist
        //okta userlist API cannot be directly accessed from the frontend
        const accessToken = this.oktaAuth.getAccessToken();
        this.httpClient.get(url,{
          headers:{
            "Authorization":"Bearer "+accessToken
          }
        }).subscribe((response:any)=>{
          this.parseResponse(response);
        })


        //getting the searchedUser from the Search component
      this.userService.updateSearchedUser.subscribe(
          (result:string)=>{
            //console.log(this.searchedUser);
            this.searchedUser = result;
            this.filterUserList(result);
      });
  }

  filterUserList(result: string) {
   //not critical feature so not created
  }

  removeReciever(user:Users){
    this.selectedUsers.splice(this.selectedUsers.indexOf(user),1);
    //also removing the user from the recievers list
    this.recieverStore.removeReciever(user.email);

  }

  parseResponse(response: any) {
    for(let i=0;i<response.length;i++){
      this.users.push(new Users(response[i].profile.firstName,response[i].profile.lastName,response[i].profile.email))
    }
  }

  selectUser(user:Users){
    this.recieverStore.addReciever(user.email);

    if(this.selectedUsers.indexOf(user) === -1){
      this.selectedUsers.push(user);
      console.log(this.selectedUsers);
    }
  }

}
