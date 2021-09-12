<template>
    <div id = "HomePage">
        <div v-if="!call" id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br/>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage" >Send</button>
        </div>
        <!-- getting the data from the child 'UserView' then using it in selectedUser method-->
        <UserView   v-on:childToParent = 'selectedUser'></UserView>
        <div id = "CallingComponent" v-if="call">
            <img v-bind:src="image">
        </div>
        <div id = "DialogBox" v-if="callReq">
            <p>You are getting a call request from : {{from}} Accept?? </p>
            <button v-on:click = "callAccepted" >Yes</button> <button v-on:click = "callRejected"> No</button>
        </div>
    </div>
</template>
<script>
import Users from '../HomePage/Users';
import {eventBus} from '../../Mediator';
import webSocket from '../../service/webSocket';

export default {
    name:"HomePage",
    components:{
        'UserView':Users 
    },
    data(){
        return{
            reciever:"global",
            message:"",
            messageList:"",
            webSocketIns : null,
            image : "",
            from:"",
            callReq:false,
            callReciever:"",
            call: false
        };
    },
   
    mounted(){        
        this.webSocketIns = new webSocket();
        this.webSocketIns.connect();
        this.$store.commit('initWebSocket', this.webSocketIns);

        //displaying message recieved from websocket in message area
        eventBus.$on('message',(message)=>{
            if(message.includes('image')){
                 this.image = message;
            }
            else if (message.includes("callRequest")){
                //creating a prompt to ask user permission for call
                this.callReq = true;  
                this.from = message.split(":")[1];        
            }
            else if(message.includes("callAccepted")){
               console.log('call has been accepted!!');
            }
            else{             
                this.messageList = this.messageList + message;
            }
        });

        
    },
    methods:{

        createMessage(message, reciever, messageType){
            var messageBody = {
                "reciever" : reciever,
                "message" : message,
                "messageType" : messageType 
            }
            return messageBody;
        },

        sendMessage(){
            this.webSocketIns.send(this.createMessage(this.message,this.reciever, "TEXT"));
        },
        
        selectedUser(user){
            //checking if the reciever is sent from User component picked if not then default 'global' is set in reciever
             //message is sent to all users if the reciever is set to 'global'
            if(user !== null){
                this.reciever = user;
            }
        }
        ,
        callAccepted(){
            this.$router.push({name:"video",params:{callAccepted: true}})
        },
        callRejected(){
            alert('you rejected the call')
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