import { Subject } from "rxjs";

export class GroupStore{
    public groupId = new Subject<string|null>();
}