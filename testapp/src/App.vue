<template>
  <div id="app">
    <button v-on:click ="hello">hello</button>
  </div>
</template>
<script>
export default {
  name:"app",
  methods:{
    hello: function(){
      alert("Hello World");
    }
  }
}
</script>

<style>

</style>


