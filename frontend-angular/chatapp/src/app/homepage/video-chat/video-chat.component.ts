import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Group } from 'src/app/shared/group.model';
import { VideoCallService } from './video-call.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css'],
  providers:[VideoCallService]
})
export class VideoChatComponent implements OnInit {
  @ViewChild('userVideo',{static:true}) userVideo!:ElementRef<HTMLVideoElement>;
  @ViewChild('userAideo',{static:true}) userAudio!:ElementRef<HTMLAudioElement>;
  @ViewChild('currentUser',{static:true}) canvas!:ElementRef<HTMLCanvasElement>;


  recievers:string[] = [];
  group!:Group;
  constructor(private route: ActivatedRoute, private callService: VideoCallService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data:any)=>{
      this.group = data['group'];
      console.log('message from the videochat component'+this.group);
      this.recievers = this.group.recievers;
      this.callService.startCall(this.userVideo,this.userAudio,this.canvas,this.group);
    });
  }

  leaveCall(){
    this.callService.leaveCall();
  }
}
