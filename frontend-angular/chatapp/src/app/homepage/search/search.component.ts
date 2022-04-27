import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { UserService } from 'src/app/services/user-store.service';
import { Users } from '../../shared/users.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  oktaUsers:Users[] = [];
  filteredUsers:string[]=[];
  constructor(private userService:UserService,@Inject(OKTA_AUTH) private oktaAuth:OktaAuth,private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

    findUser(inputEvent: Event){
      let userSearched:string = (<HTMLInputElement>inputEvent.target).value;
      this.userService.updateSearchedUser.emit(userSearched);
    }

  // filterUsers(searchedString: Event){
  //   let userSearched  = (<HTMLInputElement>searchedString.target).value;
  //   if(userSearched.length > 0){
  //     this.filteredUsers = this.oktaUsers.filter(user => user.toLowerCase().includes(userSearched.toLowerCase()));
  //   }else{
  //     this.filteredUsers.length = 0;
  //   }
  // }

}
