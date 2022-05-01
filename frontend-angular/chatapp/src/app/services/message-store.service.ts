import { EventEmitter, Injectable } from "@angular/core";
import { GroupStore } from "./group-store.service";

@Injectable()
export class MessageStore{
    public recievedMessage: EventEmitter<string> =  new EventEmitter<string>();
    constructor(private groupStore: GroupStore){

    }
    parseMessage(message:string){
        if(message.split(":")[0]=="GRP-ID"){
            let groupId: string = message.split(":")[1]    
            this.groupStore.groupId.emit(groupId) ; 
        }else{
            this.recievedMessage.emit(message);
        }
    }
    
}