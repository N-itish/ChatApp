<template>
    <div id = 'userList'>
    </div>  
</template>

<script>
import axios from 'axios';
import {eventBus} from '../Mediator.js'

export default {
    name:"userList",
    data(){
        return{
            url:"https://cors-anywhere.herokuapp.com/https://postman-echo.com/get?foo1=bar1&foo2=bar2",
            users:[]
            
        }
    },
    methods:{
        checkUsers(){
            if(this.users.length > 0){
                return this.users;
            }
        }
    },
    created: function(){
          axios.get(this.url).then((response) => {
          this.users = response;
          console.log(this.users)
          eventBus.$emit('httpData',this.users);
      })
    },
   
}
</script>