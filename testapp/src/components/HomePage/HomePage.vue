<template>

    <div id = "HomePage">

        <div v-if="!call" id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br/>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage" >Send</button>
        </div>
        <!-- getting the data from the child 'UserView' then using it in selectedUser method-->
        <UserView   v-on:childToParent = 'selectedUser'></UserView>
        <CameraView></CameraView>
        <div id = "CallingComponent" v-if="call">
            <img v-bind:src="image">
        </div>
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
            image : "",
            call: false
        };
    },
  
    mounted(){        
        this.webSocketInstance = new webSocket();
        this.webSocketInstance.connect();
        //displaying message recieved from websocket in message area
        eventBus.$on('message',(message)=>{
            if(!message.includes('image')){
                this.messageList = this.messageList + message;
            }else{
                this.image = message;
                
            }
        });

       //enabling and disabling the calls through events
        eventBus.$on('callUser',()=>{
            this.call = true;
        });

        eventBus.$on('stopCall',()=>{
            this.call = false;
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
        
        },selectedUser(user){
            //checking if the reciever is sent from User component picked if not then default 'global' is set in reciever
             //message is sent to all users if the reciever is set to 'global'
            if(user !== null){
                this.reciever = user;
            }
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