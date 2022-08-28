import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class CallStatus{
    callStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}