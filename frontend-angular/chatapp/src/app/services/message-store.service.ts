import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class MessageStore{
    public recievedMessage =  new Subject<string>();     
}