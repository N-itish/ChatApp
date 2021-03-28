<template>
  <div id="listView">
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>UserName</th>
                  <th>Role</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(user,index) in userData" :key="index">
                  <td>{{index+1}}</td>
                  <td>{{user.userName}}</td>
                  <td>{{user.role}}</td>
                  <td><button @click="edit(index)">Edit</button></td>
              </tr>
          </tbody>   
      </table>
  </div>   
</template>
<script>

import userAPI from '../../../service/userAPI'
export default {
    name : "listView",
    data(){
        return {
            userData:[]
        }
            
    },
    created(){
        userAPI.instance.get('/get').then((response)=>{
            this.userData = response.data;
        })
    },methods:{
        edit(index){
            this.$emit('userDetails',this.userData[index]);
        }
    }
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>