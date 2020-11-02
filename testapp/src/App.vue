<template>
  <div id="app">
    <router-link :to="{name:'home'}">homePage</router-link>
    <router-link :to="{name:'admin', params:{data:'Hello'}}">adminPage</router-link>
    <router-view/>
  </div>
</template>
<script>


export default {
  name:"app"
}
</script>

<style>
button{
        border:none;
        background: blue;
        color: white;
        font-size: 20px;
}
.router-link-exact-active{
  color: red;
}
</style>


