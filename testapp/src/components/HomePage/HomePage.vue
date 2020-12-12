<template>
    <div id = "HomePage">
        <div id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br/>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage" >Send</button>
        </div>
        <UserView></UserView>
        <CameraView></CameraView>
        <button v-on:click="sendToServer">sendToServer</button>
    </div>
</template>
<script>
import Camera from '../HomePage/Camera/Camera'
import Users from '../HomePage/Users/Users'
import {eventBus} from '../../Mediator';
import webSocket from '../../service/webSocket';

export default {
    name:"HomePage",
    components:{
        'CameraView':Camera,    
        'UserView':Users 
    },
    data(){
        return{
            message:"",
            messageList:"",
            webSocketInstance : null,
            privateMessage:null,
            stream: null
        };
    },
    mounted(){
        this.webSocketInstance = new webSocket();
        this.webSocketInstance.connect();

        eventBus.$on('reciever',(reciever)=>{
            this.reciever =reciever;
            console.log(reciever);
        })

        eventBus.$on('stream',(stream) =>{
            this.stream = stream;
            console.log('stream recieved')
        })

        eventBus.$on('recievedMessage',(message)=>{
            this.messageList = this.messageList + message;
        });
    },
    methods:{
        sendMessage(){
        var messageSender = {
            message:this.message,
            reciever: this.reciever
        }
        this.webSocketInstance.send(messageSender)
    },getUserName(user,index){
        this.reciever = user;
        this.selectedIndex = index;
        console.log("User selected is :"+this.reciever);
    },sendToServer(){
        this.webSocketInstance.sendVideo(this.stream);
    }
    }
}
</script>
<style scoped>
    #MessageComponent{
        font-size: 20px;float:left;
    }
    #MessageArea{
        font-size: 20px;
        width: 500px;
        height:600px;
    }
    #Message{
        font-size: 20px;
        width:  400px;
        height: 50px;
    }
    #SendButton{
        font-size: 20px;
        border:None;
        width:100px;
        height:50px;
    }
    label{
        font-size: 20px;
        width:100px;
        height:50px;
    }
    ul{
        list-style: none;
    }

    #Users{
        float: right;
        font-size: 20px;
    }
    .selected{
        background-color: black;
        color: white;
    }
</style>