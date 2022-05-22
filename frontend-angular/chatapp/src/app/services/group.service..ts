import { Inject, Injectable } from "@angular/core";
import { OKTA_AUTH } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
import { Observable, Subject } from "rxjs";
import { Group } from "../shared/group.model";
import { CustomHeaders } from "../shared/headers.model";
import { HttpService } from "./http.service";
import { RecieversStore } from "./recievers-store.service";

@Injectable()
export class GroupService {
   
    private _userGroups: Group[] = [];
    private _currentGroup: Group | undefined;
    
    constructor(
            private httpService: HttpService,
            private recieverStore:RecieversStore,
            @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    }

    public  get userGroups(){
        return this._userGroups;
    }

    public get currentGroup(){
        return this._currentGroup;
    }

    public addGroupDirectly(group:Group){
        this.addGroupToArray(group);
    }
    
    public addGroupUsingName(groupName:string){
        let group:Group;
       const recievers:string[] = this.recieverStore.getRecievers;
       if(!groupName){
           group = new Group(recievers,recievers.toString(),null,'');
       } else{
           group = new Group(recievers,groupName,null,'');
       }
       console.log(recievers);
       //setting the newly created group as the selected group
       this.setSelectedGroup(group);

       //storing the group 
       this.addGroupToArray(group); 
    }

    public addGroupWithId(group: Group) {
        this.userGroups.push(group);
    }

    //setting the current groupId 
    public setSelectedGroup(group:Group) {
             this._currentGroup = group;
         //console.log('From the groupService, groupId:'+this.currentGroupId);
    }

    private addGroupToArray(group: Group) {

        if(this._userGroups.length === 0){
            this._userGroups.push(group)   
        }         
        
        else{
        //checking if group with same email exists in the array    
        if (this.getExistingGroup(group.recievers) === null) {
                /*
                    getting the group id -- group of users is sent as parameter to backend
                    it is stored in the backend and used to recognize group with the particular id
                */
                this.getGroupId(group).subscribe(
                    (group:any)=>{
                        console.log(group);
                        this._userGroups.push(group);
                    }
                );
            }
        }
    }

    private getExistingGroup(recievers:string[]):Group|null{
        let group:Group|null = null;
        if(!(this.userGroups.length==0)){
            for (let i = 0; i < this.userGroups.length; i++) {
                if (this.userGroups[i].recievers.length === recievers.length &&
                    this.userGroups[i].recievers.every((value, index) => value === recievers[index])) {
                    group = this.userGroups[i];
                    break;
                }
            }
        }
        return group;
    }

    private getGroupId(data: Group) : Observable<Object>{
        const customHeaders: CustomHeaders = {
            key:"Content-type",
            value:"application/json"
        }
        return this.httpService.httpPost("groups",data,[customHeaders],'text');
    }
}