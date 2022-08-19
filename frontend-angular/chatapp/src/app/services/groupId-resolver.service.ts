import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { GroupService } from "src/app/services/group.service";
import { Group } from "src/app/shared/group.model";

@Injectable()
export class GroupResolver implements Resolve<Group>{
    constructor(private groupService: GroupService){}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Group> | Promise<Group> | Group{
        return this.groupService.getGroup(route.params['id']);
    }

}
