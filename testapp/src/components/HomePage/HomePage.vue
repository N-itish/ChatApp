<template>

    <div id = "HomePage">

        <div id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br/>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage" >Send</button>
        </div>
        <UserView></UserView>
        <CameraView></CameraView>
    </div>
</template>
<script>
import Camera from '../HomePage/Camera';
import Users from '../HomePage/Users';
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
            reciever:"global",
            message:"",
            messageList:"",
            webSocketInstance : null,
            privateMessage:null,
            image : null
        };
    },
    mounted(){
        
        this.webSocketInstance = new webSocket();
        this.webSocketInstance.connect();
        //checking if the reciever is sent from User component picked if not then default 'global' is set in reciever
        eventBus.$on('reciever',(reciever)=>{
            if(reciever !== null){
                this.reciever =reciever;
            }
           
            console.log(reciever);
        })

        //setting the message sent by server to the message area
        eventBus.$on('recievedMessage',(message)=>{
            if(!message.includes('image')){
                this.messageList = this.messageList + message;
            }
        });
    
    
        eventBus.$emit('WebSocketInstance',this.webSocketInstance);
    },
    methods:{
        sendMessage(){
            var messageSender = {
                message:this.message,
                reciever: this.reciever
            }
            this.webSocketInstance.send(messageSender);
        
        },getUserName(user,index){
            this.reciever = user;
            this.selectedIndex = index;
            console.log("User selected is :"+this.reciever);
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