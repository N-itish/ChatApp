<template>
    <div id = "HomePage">
        <div id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage" >Send</button>
        </div>
        <div>
            <label>find All users</label>
            <button v-on:click ="findUsers">Search</button>
            <ul v-for="(user,index) in users" :key="index">
                <li>{{index+1}} {{user}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import userAPI from '../service/userAPI'
export default {
    name:"HomePage",
    data(){
        return{
            message:"",
            messageList:"",
            stompClient:null,
            users:[]
        };
    },
    mounted(){
        var url = "http://localhost:8090/gs-guide-websocket"
        if(this.stompClient == null){
            this.stompClient = Stomp.over(new SockJS(url));
            //this.stompClient.connect();
            //testing stompclient
             
      //this.socket = new SockJS("http://localhost:8080/gs-guide-websocket");
      //this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          console.log(frame);
          this.stompClient.subscribe("/messages", tick => {
            this.messageList = this.messageList +" "+ tick.body
          });
        },
        error => {
          console.log(error);
          //this.connected = false;
        }); 
        }
    },
    methods:{
        sendMessage(){
        var messager = {
            username:"Nitish",
            message :this.message
        }
        if(this.stompClient != null){
            this.stompClient.send("/app/sendMessage",JSON.stringify(messager),{});
        }
    },findUsers(){
        userAPI.instance.get('/getUsername').then((response)=>{
            this.users = response.data;
        })
    }
    }
}
</script>
<style scoped>
    #MessageComponent{
        font-size: 20px;
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
</style>