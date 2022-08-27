import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
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
  @ViewChild('canvas',{static:true}) userCanvas!: ElementRef<HTMLCanvasElement>;

  recievers:string[] = [];
  group!:Group;
  constructor(private route: ActivatedRoute, private callService: VideoCallService,private groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.currentGroup?.subscribe((result)=>{
      console.log(result);
      // const sender = result.sender;
      // if(this.recievers.indexOf(sender) === -1){
      //   this.recievers.push(sender);
      // }
      // console.log('sender:'+sender);
      // console.log(this.userCanvas.nativeElement.id);

    });

    this.route.data.subscribe((data:any)=>{
      this.group = data['group'];
      console.log('message from the videochat component'+this.group);
      this.callService.startCall(this.userVideo,this.userAudio,this.canvas,this.group);
    });
  }

  leaveCall(){
    this.callService.leaveCall();
  }
}
