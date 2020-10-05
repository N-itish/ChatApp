<template>
    <div id = "HomePage">
        <div id = "MessageComponent">
            <textarea id = "MessageArea" v-model="messageList"></textarea><br>
            <input    id = "Message"    type="text" v-model="message">
            <button   id = "SendButton" v-on:click="sendMessage">Send</button>
        </div>
    </div>
</template>
<script>
export default {
    name:"HomePage",
    data(){
        return{
            message:"",
            messageList:""
        };
    },
    methods:{
        sendMessage(){
            this.messageList = this.messageList+this.message
        }
    }
}
</script>
<style>
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
        background-color: green;
        color:white;
        border:None;
        width:100px;
        height:50px;
    }
</style>