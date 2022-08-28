import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import {Group} from 'src/app/shared/group.model';
import { WebSocketService } from 'src/app/shared/websocket.service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
 
  userGroupName: string = "";
  userGroups:Group[] = [];
  private createdGroup?:Group;
  private selectedGroup?:Group;
  constructor(private groupService:GroupService,
    private router: Router,
    private route: ActivatedRoute,
    private websocketService:WebSocketService) { }

  ngOnInit(): void {
    this.userGroups = this.groupService.userGroups;
    this.groupService.currentGroup?.subscribe((selectedGroup)=>{
      this.selectedGroup = selectedGroup;
    })
  }

  addGroup(){
    let group = new Group(this.groupService.recievers,this.userGroupName,null,"",''); 
    this.groupService.createNewGroup(group).subscribe((data)=>{
      this.createdGroup = data as Group;
    });
  } 

  selectGroup(group:Group){
    console.log('selected group recievers is:'+group.recievers)
    this.selectedGroup = group;
    this.groupService.addRecievers(group.recievers);
  }

  startCall(id:string|null){
    //alerting everyone in the group that call is about to begin
    (this.createdGroup as Group).message= 'calling';
    this.websocketService.send(this.createdGroup as Group);
    //navigating to the video call page
    this.router.navigate(['/videoCall',id as string],{relativeTo:this.route});
  }
}
