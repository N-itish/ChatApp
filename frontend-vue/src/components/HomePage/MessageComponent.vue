<template>
    <div id="MessageView">
        <div id="MessageComponent">
            <textarea id="MessageArea" v-model="messageList"></textarea><br />
            <input id="Message" type="text" v-model="message" />
            <button id="SendButton" v-on:click="sendMessage">Send</button>
        </div>
    </div>
</template>
<script>
import Message from '../../models/Message'
import {store} from '../../store'

export default {
    name:"MessageView",
    data(){
        return{
             recievers:[] ,
             message: "",
             webSocketIns:null
        }
    },mounted(){
        this.webSocketIns = store.getters.webSocketIns;
    },
    methods:{
        sendMessage() {
            this.webSocketIns.send(new Message(this.message, this.recievers, "TEXT"));
        },
    },computed:{
        messageList() {
            //message from sender is pulled from vuex store
            return store.getters.textMessage;
        }
    }    
}
</script>
