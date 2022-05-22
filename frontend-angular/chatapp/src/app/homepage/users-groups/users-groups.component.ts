import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service.';
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
  constructor(private groupService:GroupService) { }

  ngOnInit(): void {
    this.userGroups = this.groupService.userGroups;
  }

  addGroup(){
    this.groupService.addGroupUsingName(this.userGroupName);
  } 

  selectGroup(group:Group){
    this.groupService.setSelectedGroup(group)
  }
}
