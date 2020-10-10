<template>
    <div id = "HomePage">
        <div id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage" >Send</button>
        </div>
    </div>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
export default {
    name:"HomePage",
    data(){
        return{
            message:"",
            messageList:"",
            stompClient:null
        };
    },
    mounted(){
        var url = "http://localhost:8090/gs-guide-websocket"
        if(this.stompClient == null){
            this.stompClient = Stomp.over(new SockJS(url));
            this.stompClient.connect();
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
</style>