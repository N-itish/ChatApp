import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Group } from "../shared/group.model";
import { CustomHeaders } from "../shared/headers.model";
import { HttpService } from "../shared/http.service";

const NIL_UUID = '00000000-0000-0000-0000-000000000000';

@Injectable()
export class GroupService{

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
    constructor(private httpService:HttpService){}

    sender:string = '';
    recievers:string[] = [];
    userGroups:Group[] = [];
    currentGroup:Group | undefined;


    addReciever(reciever:string){
        if(this.recievers.indexOf(reciever) === -1){
            this.recievers.push(reciever);
        }
    }

    addRecievers(recievers:string[]){
        this.recievers = recievers;
    }

    removeReciever(reciever:string){
        this.recievers.splice(this.recievers.indexOf(reciever),1);
    }

    getGroup(id:string){
        let group = undefined;
        //finding the group based on the id
        for(let i=0;i<this.userGroups.length;i++){
            if(this.userGroups[i].groupId === id){
                group = this.userGroups[i]
            }
        }
        return group as Group;
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
        if(isNotPresent && group.groupId !== NIL_UUID){
            this.userGroups.push(group);
        }
    }

    //requesting server to create a group
    createNewGroup(group:Group){
        const customHeaders: CustomHeaders = {
            key: "Content-type",
            value: "application/json"
        }

        return this.httpService.httpPost("groups",group,[customHeaders]).pipe(tap((data)=>{
            this.currentGroup = data as Group;
            if(this.currentGroup.groupId !== NIL_UUID){
                this.userGroups.push(this.currentGroup as Group);
            }
        }));
    }


}