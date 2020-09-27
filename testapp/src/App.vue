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
      </tbody>
    </table>
  </div>
</template>
<script>

export default {
  name:"app",
  data(){
     return {users: [
      { username: 'Nitish',department:"IT",address:"Bagmati"},
      { username: 'BoB',department:"RND",address:"Kumaripati"}
    ]
    }
  },
  methods:{
    remove: function(index){
      this.users.splice(index,1);
    }
  }
}
</script>

<style>

</style>


