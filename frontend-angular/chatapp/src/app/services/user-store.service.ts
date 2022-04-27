import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    updateSearchedUser:EventEmitter<string> = new EventEmitter<string>(); 
    constructor(){}
}