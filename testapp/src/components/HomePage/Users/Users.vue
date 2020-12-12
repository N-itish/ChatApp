<template>
    <div id = "UserView">
            <label>find All users</label>
            <button v-on:click ="findUsers">Search</button>
            <ul v-for="(user,index) in users" :key="index">
                <li v-bind:class="{'selected': index == selectedIndex}" v-on:click ="getUserName(user,index)">{{user}}</li>
            </ul>
    </div>
</template>
<script>
import {eventBus} from '../../../Mediator';
import userAPI from '../../../service/userAPI';
export default {
    name:'UserView',
    data(){
        return{
            reciever:"",
            selectedIndex : null,
            users:[]
        }
    },
    methods:{
        getUserName(reciever,index){
            this.reciever = reciever;
            this.selectedIndex = index;
            eventBus.$emit('reciever',this.reciever);
        },
        findUsers(){
            userAPI.instance.get('/getUsername').then((response)=>{
                this.users = response.data;
            });
        }
    }
}
</script>
<style scoped>
 .selected{
        background-color: black;
        color: white;
    }
</style>