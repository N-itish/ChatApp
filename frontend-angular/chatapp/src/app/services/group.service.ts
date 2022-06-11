import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Group } from "../shared/group.model";
import { CustomHeaders } from "../shared/headers.model";
import { HttpService } from "./http.service";

const nilUUID = '00000000-0000-0000-0000-000000000000';

@Injectable()
export class groupService{

    /* 
        list of all services
        1 -- create new group
            a) send group to the server to store and get uuid
            b) server will return the group with uuid, 
               if same group then server will send nil uuis
            b) store the group in an array if uuid is not nil
        2 -- maintain the currently selected group in a variable
        3 -- maintain the list of groups in array

    */
    userGroups:Group[] = [];
    currentGroup:Group | undefined;
    constructor(private httpService:HttpService){
    }

    addUniqueGroup(group:Group){
        let isNotPresent:boolean = true;
        for(let userGroup of this.userGroups){
            console.log(userGroup);
            if(userGroup.groupId == group.groupId){
                isNotPresent = false;
                break;
            }
        }
        console.log(isNotPresent);
        if(isNotPresent && group.groupId !== nilUUID){
            this.userGroups.push(group);
        }
    }

    createNewGroup(group:Group){
        const customHeaders: CustomHeaders = {
            key: "Content-type",
            value: "application/json"
        }

        return this.httpService.httpPost("groups",group,[customHeaders]).pipe(tap((data)=>{
            this.currentGroup = data as Group;
            if(this.currentGroup.groupId !== nilUUID){
                this.userGroups.push(this.currentGroup as Group);
            }
        }));
    }


}