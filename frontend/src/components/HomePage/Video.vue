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
        */
        message:{
            handler: function (newValues) {
                console.log(newValues);
                var canvas = this.$refs.ServerImage;
                this.paintCanvas(canvas, newValues, "MESSAGE");
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
                console.log(this.video);
                if(this.hasMediaDevices()){
                    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
                        this.video.srcObject = stream;
                    });
                    this.paintCanvas(this.canvas,this.video,'CAMERA');   
                }
                else{
                    alert("no media devices found!!!");
                } 
        },
        paintCanvas(canvas, source, sourceType) {
            var ctx = canvas.getContext("2d");
            ctx.canvas.width = 480;
            ctx.canvas.height = 640;
            if(sourceType === 'MESSAGE'){
                this.paintCanvasFromMessage(ctx,source)
            }else if(sourceType === 'CAMERA'){
                this.paintCanvasFromCamera(ctx,canvas,source)
            }else{
                alert('Source type is not built');
            }
        },
        paintCanvasFromMessage(ctx,source){
            var image = new Image();
            image.onload = function() {
                ctx.drawImage(image, 69, 50);
            };
            image.src = source
      
        },
        paintCanvasFromCamera(ctx,canvas,source){
            var self = this;
            var video = source;
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
        if(this.$route.params.callRequested){
            this.reciever = this.$route.params.callRequested;
            this.websocketIns.send(this.messageBuilder('callRequested'))
        }else if(this.$route.params.callAccepted){

            this.reciever = this.$route.params.callAccepted;
            this.websocketIns.send(this.messageBuilder('callAccepted'))

        }
    }
}
</script>
<style scoped>
    #videoCall{
        background-color: white;
        color :black;
    }
</style>
