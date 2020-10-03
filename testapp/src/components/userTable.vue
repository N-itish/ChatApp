<template>
  <div id="tableView">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>UserName</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(users,index) in userData" :key="index">
          <td>{{index+1}}<td>
          <td>{{userData.data.args.foo1}}</td>
          <td>{{userData.data.headers}}</td>
          <button v-on:click = "remove(index)">delete</button>
        </tr>
        <tr>
          <td><input v-model = "username" type = "text"/></td>
          <td><input v-model = "role" type="text"/></td>
          <button v-on:click  ="add">add</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import {eventBus} from '../Mediator.js'
export default {
  name:"tableView",
  data(){
    return {
        users:[],
        username:'',
        role:'',
        userData:[]
      }
  },
  created:function(){
    eventBus.$on('httpData',(user)=>{
      console.log("tranistion has been made")
      this.userData = user;
    })
  },
  methods:{
    userPresent: function(){
      if(this.userData.length > 0){
        return this.userData
      }
    },
    remove: function(index){
      this.users.splice(index,1);
    }
    ,add: function(){
      this.users.push({username:this.username,department:this.department,address:this.address});
      console.log(this.username+" "+this.department+" "+this.address) 
    }
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
