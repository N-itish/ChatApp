import { ElementRef, Injectable, OnInit } from "@angular/core";
import {  Router } from "@angular/router";
import { WebSocketService } from "src/app/shared/websocket.service";
import { Group } from "src/app/shared/group.model";
import { CallStatus } from "../shared/call-status.service";

const CONSTRAINTS = {
    video:true,
   // audio:true
}
const mediaStream = navigator.mediaDevices.getUserMedia(CONSTRAINTS);

@Injectable()
export class VideoCallService implements OnInit{
    interval: any;
    webscoketInterval: any;
    data:string = "";
    userGroup: Group|null = null;
    
    constructor(
        private router:Router,
        private webSocketService: WebSocketService,
        private callStatusService: CallStatus){}
    ngOnInit(): void {}
     startCall(webCam:ElementRef<HTMLVideoElement>,mic:ElementRef<HTMLAudioElement>,canvas: ElementRef<HTMLCanvasElement>,group: Group)
        {
        //setting the call status to true so that it is ignored in the websocket
        this.callStatusService.callStatus.next(true);
        
        //checking if the video/audio elements are present in the users computer
        const video =  webCam.nativeElement as HTMLVideoElement;
        const currentUserCanvas = canvas.nativeElement as HTMLCanvasElement; 
            mediaStream.then((stream)=>{
                 //start the video
                webCam.nativeElement.srcObject = stream;
                this.drawCanvas(currentUserCanvas,video)
                this.streamToServer(group);
            }).catch((err)=>{
                console.log(err)
            });

    }

    drawCanvas(canvas: HTMLCanvasElement,source: HTMLVideoElement){
        this.interval = setInterval(()=>{
            canvas.getContext("2d")?.drawImage(source,0,0);
            this.data = canvas.toDataURL('image/jpeg',0.5);
        },1000) 
    }

    private streamToServer(group:any){
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
        //clearing the status flag
        this.callStatusService.callStatus.next(false);

        //return back to the home page
        this.router.navigate(['/'])
    }

}