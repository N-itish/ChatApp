import { Message } from '@/models/Message';
import {store} from '../store';
import webSocket from './webSocket';

export class VideoService{
    private callID: number;
    private websocketIns:webSocket;

    constructor(private canvas: any,private source:any,private sourceType:string){
        this.websocketIns = store.getters.webSocketIns;
        this.callID = 1234;
    }

    public paintCanvas(): void{
        const context = this.canvas.getContext("2d");
        if(this.sourceType === 'SERVER'){
            this.paintCanvasFromServer(context,this.source)
        }else if(this.sourceType === 'CAMERA'){
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
        intervalId = 0;
    }
    private paintCanvasFromServer(context: any, source: any) {
        const image = new Image();
        image.onload = function() {
            context.drawImage(image, 69, 50);
        };
        image.src = source
    }

    private sendImageToServer(canvas:any){
        const imageString:string = canvas.toDataURL();
        //TODO get the reciever from the store and change the global to the reciever name
        const reciever = store.getters.reciever;
        this.websocketIns?.send(new Message(imageString,reciever,'CALL'))
    }

    private stopCall(){
        console.log("logging off the call!!")
        this.callID = -1;
      
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //turing off the camera
        if(this.sourceType === 'CAMERA'){
            const mediaStream = this.source.srcObject;
            mediaStream.getTracks().forEach((track:any) => track.stop())
        }
    }
  
}