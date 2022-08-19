import { ElementRef, Injectable } from "@angular/core";
import {  Router } from "@angular/router";
import { WebSocketService } from "src/app/shared/websocket.service";
import { Group } from "src/app/shared/group.model";

const CONSTRAINTS = {
    video:true,
   // audio:true
}
const mediaStream = navigator.mediaDevices.getUserMedia(CONSTRAINTS);

@Injectable()
export class VideoCallService{
    interval: any;
    webscoketInterval: any;
    data:string = "";

    constructor(private router:Router,private webSocketService: WebSocketService){}
    async startCall(
            webCam:ElementRef<HTMLVideoElement>,
            mic:ElementRef<HTMLAudioElement>,
            canvas: ElementRef<HTMLCanvasElement>,
            group: Group
        ){

 
        //checking if the video/audio elements are present in the users computer
        const video =  webCam.nativeElement as HTMLVideoElement;
        const currentUserCanvas = canvas.nativeElement as HTMLCanvasElement; 
        if(await navigator.mediaDevices.getUserMedia){
            mediaStream.then((stream)=>{
                 //start the video
                webCam.nativeElement.srcObject = stream;
                this.drawCanvas(currentUserCanvas,video)
                this.streamToServer(group);
            })
        }else{
            alert('Audio/Video elements are disables or not present!!!')
        }
       
        //use websocket to send group
        //listen to changes in message

    }

    drawCanvas(canvas: HTMLCanvasElement,source: HTMLVideoElement){
        this.interval = setInterval(()=>{
            canvas.getContext("2d")?.drawImage(source,0,0);
            this.data = canvas.toDataURL('image/png');
        },1000) 
    }

    streamToServer(group:Group){
        this.webscoketInterval =  setInterval(()=>{
            group.message = this.data;
            this.webSocketService.send(group);
        },2000)
        
    }

    leaveCall(){
        //stop drawing the canvas and stop sending image to the server
        clearInterval(this.interval);
        clearInterval(this.webscoketInterval);
        //close all the audio and video
        mediaStream.then((stream)=>{
            stream.getTracks().forEach(track=>{
                track.stop();
            })
        })
        //return back to the home page
        this.router.navigate(['/'])
    }

}