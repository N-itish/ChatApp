import { EventEmitter } from "@angular/core";

export class GroupStore{
    public groupId:EventEmitter<string|null> = new EventEmitter<string|null>();
}