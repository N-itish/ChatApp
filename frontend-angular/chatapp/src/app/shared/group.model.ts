export class Group{
    public recievers:string[] = [];
    constructor(recievers:string[] ,public groupName:string,public groupId:string|null){
        this.recievers.push(...recievers);
    }
}