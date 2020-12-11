<template>
<div name = "cameraComp">
    <video ref= "video" autoplay></video>
    <button @click="stopStream">Stop</button>
    <button @click="startStream">Start</button>
</div>

</template>
<script>

export default {
    name:"cameraComp",
    data(){
        return {
            video:{}
        }
    },
    mounted() {
        
        //getting the refrence of the camera object
        this.video = this.$refs.video;
        this.startStream();
    },
    methods:{
        sendToServer(stream){
            console.log(stream)
        },
        stopStream(){
            var mediaStream = this.video.srcObject;
            var tracks = mediaStream.getTracks();
            for(var i = 0 ; i< tracks.length;i++){
                console.log(tracks[i]);
                tracks[i].stop();
            }
            this.video = null;
        },
        startStream(){
            this.video = this.$refs.video;
            var constrains = {
            //check your constrains for camera
                video:{
                    width: { min: 640 }, height: { min: 480 }
                }
            }
            //checking if the mediadevices is present or not
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                //getting the video from the camera
                navigator.mediaDevices.getUserMedia(constrains).then(
                stream => {
                    //setting the src of the video to the stream
                    this.video.srcObject = stream;
                    this.video.play();
                    //this.sendToServer(stream);
                });
            }

        }
    }

}
</script>
