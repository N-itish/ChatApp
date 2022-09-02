import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/shared/group.model';
import { CallStatus } from '../shared/call-status.service';
import { VideoCallService } from './video-call.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css'],
  providers:[VideoCallService]
})
export class VideoChatComponent implements OnInit, AfterViewInit {
  @ViewChild('userVideo',{static:true}) userVideo!:ElementRef<HTMLVideoElement>;
  @ViewChild('userAideo',{static:true}) userAudio!:ElementRef<HTMLAudioElement>;
  @ViewChild('currentUser',{static:true}) canvas!:ElementRef<HTMLCanvasElement>;
  @ViewChild('sender',{static: false}) senders!:QueryList<ElementRef> 

  imageSenders:string[] = [];

  group!:Group;
  constructor(
    private route: ActivatedRoute, 
    private callService: VideoCallService,
    private groupService: GroupService,
    ) { }
  ngAfterViewInit(): void {
    this.groupService.currentGroup.subscribe((result)=>{
      const sendersArray = Object.keys(this.senders);
      console.log(sendersArray); 
    })
    
  }


  ngOnInit(): void {
  

 

    this.imageSenders = this.groupService.recievers;
    console.log(this.imageSenders);
    this.route.data.subscribe((data:any)=>{
      this.group = data['group'];
      console.log('message from the videochat component');
      this.callService.startCall(this.userVideo,this.userAudio,this.canvas,this.group);
    });
  }

  leaveCall(){
    this.callService.leaveCall();
  }
}
