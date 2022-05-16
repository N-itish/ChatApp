export class Group{
    public recievers:string[] = [];
    constructor(group:string[] ,public groupName:string,public groupId:string|null){
        this.recievers.push(...group);
    }
}