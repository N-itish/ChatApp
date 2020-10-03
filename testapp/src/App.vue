<template>
  <div id="app">
    <user-table></user-table>
    <user-list></user-list>
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
  },
  components:{ 
     userList,
     userTable
  },
}
</script>

<style>

</style>


