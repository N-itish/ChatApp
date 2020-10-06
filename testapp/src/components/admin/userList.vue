<template>
    <div id = 'userList'>
    </div>  
</template>

<script>
import axios from 'axios';
import {eventBus} from '../../Mediator'

export default {
    name:"userList",
    data(){
        return{
            url:"http://localhost:8090/user/get",
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
    created(){
          axios.get(this.url).then((response) => {
          this.users = response;
          eventBus.$emit('httpData',this.users);
      })
    },
   
}
</script>