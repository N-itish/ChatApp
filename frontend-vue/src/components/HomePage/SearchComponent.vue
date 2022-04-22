<template>
    <div id = "SearchComponent">
        <input type="text" v-model="searchedUser" v-on:input="searchUser()" >
        <!-- <button class="btn btn-primary" v-on:click="searchUser()">Search User</button> -->
        <button type="button" id="clearButton" v-on:click="clearSearch()" class="btn btn-danger">
            <font-awesome-icon icon = "fa fa-trash"></font-awesome-icon>
        </button>

        <div v-if="this.foundUsers.length >0">
            <div v-for="user in foundUsers" v-bind:key="user"> 
                <ul>
                    <button type ="button" v-on:click="setUser(user)">{{user}}</button>
                </ul> 
            </div>
        </div>
        <!-- the div shows selected users only if user is not search other users -->
        <div  class= "selected-users" v-if="reciever.length > 0">
            Selected Users:
            <span  v-for="user in reciever" v-bind:key="user">
                <span class="alert alert-primary alert-dismissible fade show" role="alert">
                    {{user}}
                    <button v-on:click="removeUser(user)" removetype="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </span>
            </span>
        </div>
    </div>
</template>
<script>
//import HttpService from '../../service/HttpService';
import {store} from '../../store'
export default {
    name:"SearchComponent" ,
    data(){
        return {
            users:['Niti','Ni','niTi','paln','patty'],
            searchedUser:'',
            foundUsers: [],
            userGroup:[]
        }
    }, mounted(){
        //this.userGroup = Store.getters.reciever;
        this.getUsers();
    },computed:{
        reciever(){
            return store.getters.reciever;
        }
    },watch:{
        reciever(oldValue,newValue){
            console.log(oldValue);
            console.log(newValue);
        }
    },
    methods:{
        getUsers(){
            //TODO: uncomment this later
            /*let httpService = new HttpService();
            httpService.httpGet('/users').then((data)=>{
                this.users = data
            });*/
        },searchUser(){
            //getting all the related users 
            console.log(this.foundUsers.length);
            let result = this.users.filter(
                element => element.toLowerCase().includes(this.searchedUser.toLowerCase())
            );
            console.log(result)
           if(result !== undefined){
               this.foundUsers = result;
           }
           
        },setUser(user){
            store.commit('addReciever',user);
        }, clearSearch(){
            this.foundUsers = []
            this.searchedUser = ''
        },removeUser(user){
            store.commit('removeReciever',user);
       }
    }   
}
</script>
<style scoped>
.list-group{
    width: 20%;
}

.selected-users{
    padding: 30px;
}
#clearButton{
    margin-left: 10px;
}

</style>