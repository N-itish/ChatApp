<template>
  <div id="app">
    <default-router></default-router>
  </div>
</template>
<script>

import defaultRouter from './router/defaultRouter';
export default {
  name:"app",
  data(){
    return{ 
      users:[]
    };
  },
  components:{ 
     defaultRouter
  },
}
</script>

<style>
button{
        border:none;
        background: blue;
        color: white;
        font-size: 20px;
}
</style>


