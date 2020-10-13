<template>
  <div id="adminPanel">
      <div id = "Header">
          <label v-on:click = "showUserList">Display Users</label>
      </div>
      <list-view v-if="showList" v-on:userDetails="getUserDetails"></list-view>
      <detailed-view  v-if="showDetails" :userData = "detailedUserData"></detailed-view>
      <button id = "logout">Logout</button>
  </div>
</template>
<script>
import listView from '../admin/UserDetails/List';
import detailedView from '../admin/UserDetails/Detailed';
export default {
  name:"adminPanel",
  data(){
    return{
      showList:false,
      showDetails:false,
      detailedUserData:[]
    };
  },methods:{
    showUserList(){
      this.showList = true;
      this.showDetails = false;
    },
    getUserDetails(value){
      this.detailedUserData = value;
      this.showList = false;
      this.showDetails = true;
    }
  },
 components:{
    listView,
    detailedView
  }
}
</script>
<style scoped>
#Header{
  top:0%;
  font-size: 20px;
  background-color: black;
  vertical-align: middle;
  padding: 1em;
}
label{
  margin-left: 20px;
  color: white;
  padding: 20px;
}
label:hover{
  color:black;
  background-color: white;
}
#logout{
  float: right;
  padding:10px;
  position:relative;
  margin-top:40%;
  margin-right : 20px;
}
</style>


