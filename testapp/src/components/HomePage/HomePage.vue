<template>
    <div id = "HomePage">
        <div v-if="!call" id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br/>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage" >Send</button>
        </div>
        <!-- getting the data from the child 'UserView' then using it in selectedUser method-->
        <UserView id="userview"  v-on:childToParent = 'selectedUser'></UserView>
        <div id = "callNotification" v-if="!callReq" > 
            You are getting call from : {{from}} <br>
            <button>accept</button> <button> reject</button>
        </div>
    </div>
</template>
<script>
import Users from '../HomePage/Users';
import store from '../../store';
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
            webSocketIns : null,
        };
    },
   computed:{
       messageList(){
           //message from sender is pulled from vuex store
           return store.getters.textMessage;
       },
       from(){
           return store.getters.specialCommand;
       },
       callReq(){
           return store.getters.specialCommand.length > 0;
       }
   },
    mounted(){        
        this.webSocketIns = new webSocket();
        this.webSocketIns.connect();
        this.$store.commit('initWebSocket', this.webSocketIns);
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
        font-size: 20px;
        position:absolute;
        left: 30%;
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
    #callNotification{
        border: 1px solid black;
        padding-top: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        display: inline-block;
        left:50%;
        top:50%;
    }
</style>