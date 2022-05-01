export class Message{
    constructor(private recievers:string[],private message:string,private messageType:string,private groupId:string|null){}
}