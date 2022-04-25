import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class MessageStore{
    recievedMessage: EventEmitter<string> =  new EventEmitter<string>();
}