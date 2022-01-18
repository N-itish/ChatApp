<template>
    <div id = "UserView">
            <label>find All users</label>
            <button v-on:click ="findUsers">Search</button>
            <ul v-for="(user,index) in users" :key="index">
                <li v-bind:class="{'selected': index == selectedIndex}" v-on:click ="getUser(user,index)">{{user}}</li>
                <button v-on:click ="callUser(user)">call</button>
            </ul><br>
    </div>
</template>
<script>
import userAPI from '../../service/userAPI';
//import {Users} from '../../models/Users'
export default {
    name:'UserView',
    data(){
        return{
            selectedIndex : null,
            users:[]
        }
    },
    methods:{
        getUser(reciever,index){
            this.selectedIndex = index;
            //sending selected user from this component to the homepage
            this.$emit('childToParent', reciever)
        },
        findUsers(){
            userAPI.instance.get('/users').then((response)=>{
                this.users = response.data;
            });
        },
        callUser(reciever){
            //routing to the videocall view with the reciever name
            console.log("from user component:"+reciever);
            this.$router.push({name  : 'video', params:{callRequested: reciever} });
        }
    } 
}
</script>
<style scoped>
 .selected{
        background-color: black;
        color: white;

    }
    #userview{
        float:right;
    }
</style>