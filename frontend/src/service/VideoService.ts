
import { Message } from '@/models/Message';
import Store from '../store';
import webSocket from './webSocket';
export class VideoService{
    private callID: number;
    private websocketIns:webSocket;

    constructor(private canvas: any,private source:any){
        this.websocketIns = Store.getters.webSocketIns;
        this.callID = 1234;
    }

    public paintCanvas(sourceType:string): void{
        let context = this.canvas.getContext("2d");
        if(sourceType === 'SERVER'){
            this.paintCanvasFromServer(context,this.source)
        }else if(sourceType === 'CAMERA'){
            this.paintCanvasFromCamera(context,this.canvas)
        }
    }
    private paintCanvasFromCamera(context: any, canvas: any) {
        //refrest the video every 2 sec
        var intervalId = setInterval(() => {
            //TODO: need to create a method that sets the value of callID to -1
             if(this.callID === -1){
                clearInterval(intervalId);
            } 
            context.drawImage(this.source,0,0,640, 480);
            this.sendImageToServer(canvas);
        },2000)
    }
    private paintCanvasFromServer(context: any, source: any) {
        let image = new Image();
        image.onload = function() {
            context.drawImage(image, 69, 50);
        };
        image.src = source
    }

    private sendImageToServer(canvas:any){
        let imageString:string = canvas.toDataURL();
        //TODO get the reciever from the store and change the global to the reciever name
        this.websocketIns?.send(new Message(imageString,'global','CALL'))
    }
  
}