import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { groupService } from 'src/app/services/group.service';
import { RecieversStore } from 'src/app/services/recievers-store.service';
import {Group} from 'src/app/shared/group.model';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
 
  userGroupName: string = "";
  userGroups:Group[] = [];
  constructor(private groupService:groupService,private recievers:RecieversStore) { }

  ngOnInit(): void {
    this.userGroups = this.groupService.userGroups;
  }

  addGroup(){
    let group = new Group(this.recievers.getRecievers,this.userGroupName,null,""); 
    this.groupService.createNewGroup(group).subscribe((data)=>{});
  } 

  selectGroup(group:Group){
    console.log('selected group recievers is:'+group.recievers)
    this.groupService.currentGroup = group;
    this.recievers.addRecievers(group.recievers);
  }

  startCall(){
    console.log('call started');
    //this.router.navigate(['/videoCall']);
  }
}
