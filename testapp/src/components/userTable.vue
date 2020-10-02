<template>
  <div id="tableView">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>UserName</th>
          <th>Department</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user,index) in users" :key="index">
          <td>{{index+1}}<td>
          <td>{{user.username}}</td>
          <td>{{user.department}}</td>
          <td>{{user.address}}</td>
          <button v-on:click = "remove(index)">delete</button>
        </tr>
        <tr>
          <td><input v-model = "username" type = "text"/></td>
          <td><input v-model = "department" type = "text"/></td>
          <td><input v-model = "address" type="text"/></td>
          <button v-on:click  ="add">add</button>
        </tr>
      </tbody>
    </table>
    <h1 v-if="userPresent">{{userData}}</h1>
  </div>

</template>
<script>
export default {
  name:"tableView",
  props:{
    userData:String
  },
  data(){
    return {
        users:[],
        username:'',
        department :'',
        address:'',
      }
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
</style>
