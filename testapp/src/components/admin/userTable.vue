<template>
  <div id="tableView">
    <user-list></user-list>
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
          <td>{{userData.data.userName}}</td>
          <td>{{userData.data.role}}</td>
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
import {eventBus} from '../../Mediator.js'
import userList from '../../components/admin/userList';
export default {
  name:"tableView",
  data(){
    return {
        users:[],
        username:'',
        role:'',
        userData:[]
      }
  },components:{
    userList
  },
  created(){
    eventBus.$on('httpData',(user)=>{
      console.log("tranistion has been made")
      this.userData = user;
    })
  },
  methods:{
    userPresent(){
      if(this.userData.length > 0){
        return this.userData
      }
    },
    remove(index){
      this.userData.splice(index,1);
    }
    ,add(){
      this.userData.push({username:this.username,role:this.role});
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
