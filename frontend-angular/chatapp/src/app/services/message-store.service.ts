import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { GroupStore } from "./group-store.service";

@Injectable()
export class MessageStore{
    public recievedMessage =  new Subject<string>();
    constructor(private groupStore: GroupStore){

    }
    parseMessage(message:string){
        if(message.split(":")[0]=="GRP-ID"){
            let groupId: string = message.split(":")[1]    
            this.groupStore.groupId.next(groupId) ; 
        }else{
            this.recievedMessage.next(message);
        }
    }
    
}