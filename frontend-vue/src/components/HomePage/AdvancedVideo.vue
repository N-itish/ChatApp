<template>
    <div name = "advVid">
         <div id = "videoComponent">
            <video></video>
            <div v-for="rec in getrecievers" v-bind:key="rec">
                <canvas></canvas>
            </div>
        </div>
    </div> 
</template>
<script>
import { Message } from '@/models/Message';
import Store from '../../store';
export default{
    name:"AdvVid",
    data(){
        return {
            recievers: []
        }
    },computed:{
        getrecievers(){
            return Store.getters.recievers;
        }
    },watch:{
    getrecievers(oldValue,newValue){
        console.log(newValue);
    }
    },mounted(){     
        //getting the websocket instance from the vuex store
        this.websocketIns = Store.getters.webSocketIns; 
        console.log('Websocket instance is '+this.websocketIns);
        //handling the call status
        //this.handleCallStatus();
    }, 
    methods:{
        messageBuilder(message){
            return new Message(message,this.reciever,"CALL")
        },
        handleCallStatus(){
                //getting the reciever and sending status to server
                if(this.$route.params.callRequested) {
                    this.websocketIns.send(this.messageBuilder('callRequested'));
                } else if(this.$route.params.callAccepted) {
                    this.websocketIns.send(this.messageBuilder('callAccepted'));
                }
                Store.commit('setReciever',this.reciever);
        }
    },
    

    //check call status if accepted then start recievers video
    //check for incoming url
}
</script>
