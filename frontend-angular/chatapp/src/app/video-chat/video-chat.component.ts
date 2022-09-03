import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChildren('sender') senders!:QueryList<ElementRef> ;

  imageSenders:string[] = [];

  group!:Group;
  constructor(
    private route: ActivatedRoute, 
    private callService: VideoCallService,
    private groupService: GroupService,
    ) { }
  ngAfterViewInit(): void {
    this.groupService.currentGroup.subscribe((result)=>{
      this.senders.forEach((sender)=>{
        //seperate the canvas for that particular sender
        if(this.imageSenders.indexOf(result.sender) === parseInt(sender.nativeElement.id)){
          console.log("works till here");
          let context  = sender.nativeElement.getContext('2d');
          let image = new Image();
          image.onload = () =>{
            context.drawImage(image,0,0);
          }
          image.src = result.message;
        }
       })
    })
    
  }


  ngOnInit(): void {
    //setting the no of canvas this component needs to create
    this.imageSenders = this.groupService.recievers;
   //getting data from the group resolver and starting the video service
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
