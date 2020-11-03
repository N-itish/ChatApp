<template>
  <div id="app">
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
  padding: 10px;
  color:white;
}
 a {
    text-decoration: none;
}
</style>


