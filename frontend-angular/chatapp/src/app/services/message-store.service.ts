import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class MessageStore{
    public recievedMessage =  new Subject<string>();     
}