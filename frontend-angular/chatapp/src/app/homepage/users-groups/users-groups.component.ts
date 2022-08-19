import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import {Group} from 'src/app/shared/group.model';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit {
 
  userGroupName: string = "";
  userGroups:Group[] = [];
  constructor(private groupService:GroupService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userGroups = this.groupService.userGroups;
  }

  addGroup(){
    let group = new Group(this.groupService.recievers,this.userGroupName,null,"",''); 
    this.groupService.createNewGroup(group).subscribe((data)=>{});
  } 

  selectGroup(group:Group){
    console.log('selected group recievers is:'+group.recievers)
    this.groupService.currentGroup = group;
    this.groupService.addRecievers(group.recievers);
  }

  startCall(id:string|null){
    console.log('clicked with id:'+id );
    this.router.navigate(['/videoCall',id as string],{relativeTo:this.route});
  }
}
