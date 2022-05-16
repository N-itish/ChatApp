import { Inject, Injectable } from "@angular/core";
import { OKTA_AUTH } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
import { Observable, Subject } from "rxjs";
import { Group } from "../shared/group.model";
import { HttpService } from "./http.service";
import { CustomHeaders } from "../shared/headers.model";
import { RecieversStore } from "./recievers-store.service";

const url = 'http://localhost:9001/api/groups';
@Injectable()
export class GroupService {
   
    private _userGroups: Group[] = [];
    private currentGroupId:string ='';
    constructor(
            private httpService: HttpService,
            private recieverStore:RecieversStore,
            @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    }

    public get userGroups(){
        return this._userGroups;
    }

    public addGroup(groupName:string){
       const group:string[] = this.recieverStore.getRecievers;
       this.addGroupToArray(group,groupName); 
    }

    public addGroupWithId(group: Group) {
        this.userGroups.push(group);
    }

    //setting the current groupId 
    setSelectedGroupId(group:Group) {
        this.currentGroupId = group.groupId as string;
        console.log('From the groupService, groupId:'+this.currentGroupId);
    }

    private addGroupToArray(recievers: string[],groupName:string) {
        //group represents the group of recievers
        let newGroup:Group;
        if(!groupName){
            newGroup = new Group(recievers, recievers.toString(), null);
        }else{
            newGroup = new Group(recievers,groupName,null);
        }
        
        //checking if group with same email exists in the array
        if (this.getExistingGroup(recievers) === null) {
            /*
                getting the group id -- group of users is sent as parameter to backend
                it is stored in the backend and used to recognize group with the particular id
            */
            this.getGroupId(newGroup.recievers).subscribe((groupId:any)=>{
                newGroup.groupId = groupId;
                this.userGroups.push(newGroup);
            });
        }
    }

    private getExistingGroup(recievers:string[]):Group|null{
        let group:Group|null = null;
        for (let i = 0; i < this.userGroups.length; i++) {
            if (this.userGroups[i].recievers.length === recievers.length &&
                this.userGroups[i].recievers.every((value, index) => value === recievers[index])) {
                group = this.userGroups[i];
                break;
            }
        }
        return group;
    }

    private getGroupId(data: string[]) : Observable<Object>{
        const customHeaders: CustomHeaders = {
            key:"Content-type",
            value:"application/json"
        }
        return this.httpService.httpPost("groups",JSON.stringify(data),[customHeaders],'text');
    }
}