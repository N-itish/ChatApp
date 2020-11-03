<template>
    <div id = "HomePage">
        <div id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br/>
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
import {eventBus} from '../Mediator';
import webSocket from '../service/webSocket';
import userAPI from '../service/userAPI';
export default {
    name:"HomePage",
    data(){
        return{
            message:"",
            messageList:"",
            users:[],
            webSocketInstance : null
        };
    },
    mounted(){
        this.webSocketInstance = new webSocket();
        this.webSocketInstance.connect();
        eventBus.$on('recievedMessage',(message)=>{
            this.messageList = this.messageList + message;
        });
    },
    methods:{
        sendMessage(){
        var messageSender = {
            username:"Nitish",
            message :this.message
        }
        this.webSocketInstance.send(messageSender)
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