<template>
    <div name = "videoCall">
        <h1>Call Underway</h1>
        <canvas ref = "clientImage" id = "clientImage"></canvas>
        <canvas ref = "ServerImage" id = "serverImage"></canvas>
        <button v-on:click = "leaveCall()">leave</button>
        <video ref = "video" autoplay></video>
    </div>
</template>
<script>
import { Message } from '@/models/Message';
import Store from '../../store';
import { VideoService } from '@/service/VideoService';

const constraints  = {
    video: true,
}
export default{
  name: "videoCall",
  
    data(){
        return {
            reciever : "",
            caller:  "",
            callID : null,
            websocketIns : null,
            videoService: null
        }
    },
    computed:{
       specialCommand(){
           return Store.getters.specialCommand;
       },
       message(){
           return Store.getters.textMessage;
       }

    },
    watch:{
        specialCommand(newValues){
            if(newValues == 'callAccepted'){
                this.callInitiated = true;
                this.startVideo();
            }
        },
        /*
            using immediate in this since the canvas
            will require the vue component to be loaded otherwise
            it will set undefined in canvas refrence
        
            watch for images from the server and then display them in the canvas
        */
        message:{
            handler: function (newValues) {
                var canvas = this.$refs.ServerImage;
                this.videoService = new VideoService(canvas,newValues,"SERVER");
                if(this.videoService !== null){
                    this.videoService.paintCanvas();
                }   
            },
            immediate: true
            
        }
    },
    methods:{
        hasMediaDevices() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        },
 
        startVideo(){

                this.callID = 1234;
                this.video = this.$refs.video;
                this.canvas = this.$refs.clientImage;
                this.videoService = new VideoService(this.canvas,this.video,'CAMERA');
                if(this.hasMediaDevices()){
                    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
                        this.video.srcObject = stream;
                    });
                    this.videoService.paintCanvas();  
                }
                else{
                    alert("no media devices found!!!");
                } 
        },
        leaveCall(){
            if(this.videoService !== null){
                this.videoService.stopCall()
            }
            this.$router.push("/");
        },
        callRequest(){
            this.websocketIns.send(this.messageBuilder("callRequested"))   
            //TODO : remove hardcoded 'false' with the result given from server
            return false;
        },
        messageBuilder(message){
            console.log('from video component,messagebuilder func:'+this.reciever);
            return new Message(message,this.reciever,'CALL');

        },
        checkCallsRequest(){
                if(this.$route.params.callRequested) {
                    this.reciever=this.$route.params.callRequested;
                    this.websocketIns.send(this.messageBuilder('callRequested'));
                } else if(this.$route.params.callAccepted) {
                     this.reciever=this.$route.params.callAccepted;
                    this.websocketIns.send(this.messageBuilder('callAccepted'));
                }
        }
    },
    mounted(){
        //getting the reciver from the users component via router
        this.reciever = this.$route.params.callRequested;
        
        //storing the reciever in the vuexStore
        Store.commit('setReciever',this.reciever);
        //getting the websocket instance from the vuex store
        this.websocketIns = Store.getters.webSocketIns; 
        this.checkCallsRequest();
    }
}
</script>
<style scoped>
    #videoCall{
        background-color: white;
        color :black;
    }
</style>

