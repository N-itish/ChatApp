import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class RecieversStore{
    
    private recievers:string[] = [];
    constructor(){}
    public get getRecievers(){
        return this.recievers;
    }
    addReciever(reciever:string){
        if(this.recievers.indexOf(reciever) === -1){
            this.recievers.push(reciever);
        }
    }
    removeReciever(reciever:string){
        this.recievers.splice(this.recievers.indexOf(reciever),1);
    }
}