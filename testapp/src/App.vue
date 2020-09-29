<template>
  <div id="app">
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
    <h2>{{getData}}</h2>
  </div>

</template>
<script>
import axios from 'axios';
export default {
  

  name:"app",
  data(){
    return {
        users:[],
        username:'',
        department :'',
        address:'',
        url:' https://cors-anywhere.herokuapp.com/https://postman-echo.com/get?foo1=bar1&foo2=bar2',
        getData:[]
      }
  },
  mounted(){
    this.getHttpRequest()
  },
  methods:{
    remove: function(index){
      this.users.splice(index,1);
    }
    ,add: function(){
      this.users.push({username:this.username,department:this.department,address:this.address});
      console.log(this.username+" "+this.department+" "+this.address) 
    },getHttpRequest(){
        axios.get(this.url).then((response) => {
          console.log(response);
          this.getData = response;
      })
    }
  }
}
</script>

<style>

</style>


