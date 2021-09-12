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
import Store from '../../store';
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
            websocketIns : null
        }
    },
    methods:{
        hasMediaDevices() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        },
 
        startVideo(){
            if(this.callRequest())
            {
                this.callID = 1234;
                this.video = this.$refs.video;
                console.log(this.video);
                if(this.hasMediaDevices()){
                    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
                        this.video.srcObject = stream;
                    });
                    this.paintCanvas(this.video);   
                }
                else{
                    alert("no media devices found!!!");
                }
            }
            else{
                alert('call rejected by the reciever!!!')
            }
        },

        paintCanvas(videoInput){
            var canvas = this.$refs.clientImage;
            var ctx = canvas.getContext("2d");
            var self = this;
            var video = videoInput;
            ctx.canvas.width  = 480;
            ctx.canvas.height = 640;
            //refreshing the canvas every 2 secs
            
            var intervalId = setInterval(() => {
                if(self.callID == null){
                    clearInterval(intervalId);
                } 
                ctx.drawImage(video,0,0,640, 480);
                this.sendImage(canvas.toDataURL()) ;
            },2000)
        },
        sendImage(imageString){
            this.websocketIns.send(this.messageBuilder(imageString));
        },
        leaveCall(){
            console.log("logging off the call!!")
            //stopping the canvas refresh
            this.callID = null;
            
            //turing off the camera
            var mediaStream = this.$refs.video.srcObject;
            mediaStream.getTracks().forEach(track => track.stop())
        },
        callRequest(){
            this.websocketIns.send(this.messageBuilder("callRequested"))    
            //TODO : remove hardcoded 'false' with the result given from server
            return false;
        },
        messageBuilder(message){
            var builtMessage = {
                    reciever  : this.reciever,
                    message : message,
                    messageType : 'CALL'
            }
            return builtMessage;
        }
    },
    mounted(){
        //getting the reciver from the users component via router
        this.reciever = this.$route.params.callReciever;

        
        //getting the websocket instance from the vuex store
        this.websocketIns = Store.getters.webSocketIns; 
        console.log(this.websocketIns);
        if(this.$route.params.callAccepted){
            this.websocketIns.send(this.messageBuilder('callAccepted'))
        }else{
            this.startVideo();
        }
    }
}
</script>
<style scoped>
    #videoCall{
        background-color: white;
        color :black;
    }
    #serverImage{
        text-align: right;
    }
</style>
