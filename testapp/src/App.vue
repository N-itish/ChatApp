<template>
  <div id="app">
    <user-table></user-table>
    <!--loading taking the data from the postman api in user-list takes long time -->
    <user-list></user-list>
  </div>
</template>
<script>
import userList from './components/userList.vue';
import userTable from './components/userTable.vue'
export default {
  name:"app",
  components:{ 
     userList,
     userTable
  },
}
</script>

<style>

</style>


