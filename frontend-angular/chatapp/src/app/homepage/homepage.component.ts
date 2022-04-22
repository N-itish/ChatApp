import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Users } from './search/users.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  url: string = '';
  users: Users[] = [];
  constructor(private httpClient:HttpClient,@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {

    //configure it to request data from the spring boot backend
    //spring boot has already been configured to return the list of users from okta
    //userlist url of okta cannot be directly accessed from frontend
    // hit '/api/users' url

    //need to add authentication token
    const accessToken = this.oktaAuth.getAccessToken();
    this.url = "http://localhost:9001/api/users";
    this.httpClient.get(this.url,
        {
          headers:{
            Authorization:'Bearer '+ accessToken
          }
        }
    )
    .subscribe(
        (result:any)=>{
          this.getObjectsfromArray(result)
        }
    )}

    getObjectsfromArray(result:any){
      for(let i = 0;i< result.length;i++){
        this.users.push(new Users(result[i].profile.firstName, result[i].profile.lastName))
      }
    }
}


