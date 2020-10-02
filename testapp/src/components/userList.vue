<template>
    <div id = "userList">
        <h1 v-if="checkUsers">{{users}}</h1>
    </div>
</template>

<script>
import axios from 'axios';
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
        },
        emitToParent(){
            this.$emit('child-data',this.users)
        }
    },
    created: function(){
          axios.get(this.url,{
            'Access-Control-Allow-Origin': '*'
          }).then((response) => {
          this.users = response;
          this.emitToParent();
      })
    },
   
}
</script>