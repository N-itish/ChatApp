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

import {HttpService} from '../../service/HttpService'
import Store from '../../store';
export default {
    name:'UserView',
    data(){
        return{
            selectedIndex : -1,
            users: []
        }
    },
    methods:{
        getUser(reciever,index){
             this.selectedIndex = index;
            //sending selected user from this component to the homepage
            this.$emit('childToParent', reciever)
        },
         findUsers(){
            let httpService = new HttpService();
            httpService.httpGet('/users').then(result =>{
                this.users = result.map(function(users){
                    return users["userName"];
                });
            });
        },
        callUser(reciever){
            //storing the reciever
            Store.commit('setReciever',reciever);
             //routing to the videocall view with the reciever name
            this.$router.push({name  : 'video'});
        }
    } 
};
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