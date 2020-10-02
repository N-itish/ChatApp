<template>
  <div id="app">
   
    <user-table userData = "MyName"></user-table>
     <user-list @child-data="getChildData"></user-list>
    <!--loading taking the data from the postman api in user-list takes long time -->
  </div>
</template>
<script>
import userList from './components/userList.vue';
import userTable from './components/userTable.vue';
export default {
  name:"app",
  data(){
    return{ 
      users:[]
    };
  },methods:{
    getChildData(value){
      console.log("data recieved from the child");
      this.users = value;
      console.log(this.users);
    }
  },
  components:{ 
     userList,
     userTable
  },
}
</script>

<style>

</style>


