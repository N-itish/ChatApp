<template>
  <div id="HomePage">
    <div id="NavBar">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand">Chat App</a>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link :to="{ path: '/message' }" class="nav-item nav-link">Messaging <span class="sr-only">(current)</span></router-link>
            <router-link :to="{ path:'/videoChat'}" class="nav-item nav-link" href="#">Video Chat</router-link>
          </div>
        </div>
    
      </nav>
    </div>
        <form>
          <SearchComponent></SearchComponent>
        </form>
    <!-- child routes component are displayed here  -->
     <router-view></router-view>
  </div>
</template>
<script>
import store from "../../store";
import webSocket from "../../service/webSocket";
import Search from './SearchComponent';
export default {
  name: "HomePage",
  components: {
    SearchComponent: Search
  },
  data() {
    return {
      webSocketIns: null,
    };
  },
  mounted() {
    this.webSocketIns = new webSocket();
    this.webSocketIns.connect();
    store.commit("initWebSocket", this.webSocketIns);
  },
};
</script>
<style scoped>
/* #MessageComponent{
        font-size: 20px;
        position:absolute;
        left: 30%;
    }
    #MessageArea{
        font-size: 20px;
        width: 500px;
        height:600px;
    }
    #Message{
        font-size: 20px;
        width:  400px;
        height: 50px;
    }
    #SendButton{
        font-size: 20px;
        border:None;
        width:100px;
        height:50px;
    }
    label{
        font-size: 20px;
        width:100px;
        height:50px;
    }
    ul{
        list-style: none;
    }

    #Users{
        float: right;
        font-size: 20px;
    }
    .selected{
        background-color: black;
        color: white;
    }
    #callNotification{
        border: 1px solid black;
        padding-top: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        float: left;
    } */
</style>