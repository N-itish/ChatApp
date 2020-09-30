<template>
    <div id = "userList">
        <h1 v-if="users">{{users.data.args}}</h1>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"userList",
    data(){
        return{
            url:"https://cors-anywhere.herokuapp.com/https://postman-echo.com/get?foo1=bar1&foo2=bar2",
            users:[]
        }
    },
    created: function(){
          axios.get(this.url).then((response) => {
          console.log(response);
          this.users = response;
      })
    }
}
</script>