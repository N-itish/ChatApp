import {Group} from '../shared/group.model'

export class Message{
  
    constructor(public message: string,public messageType: string,public group: Group){}

}