export class Group{
    public recievers:string[] = [];
    constructor(
        recievers:string[] ,
        public groupName:string,
        public groupId:string|null,
        public message:string,
        public sender:string){
        this.recievers.push(...recievers);
    }
}