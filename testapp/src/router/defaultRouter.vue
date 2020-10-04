<template>
    <component :is="routedComponent"></component>
</template>
<script>
import HomePage from '../components/HomePage';
import userTable from '../components/userTable';
const routes ={
    '/':HomePage,
    '/admin': userTable
}
export default {
   data(){
       return {
           current: window.location.pathname
       };
   },
   computed:{
       routedComponent(){
            return routes[this.current];
       }
   }
}
</script>