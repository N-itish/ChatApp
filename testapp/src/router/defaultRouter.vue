<template>
    <component :is="routedComponent"></component>
</template>
<script>
import HomePage from '../components/HomePage';
import userTable from '../components/admin/userTable';
import Login from '../components/Login'
import Registration from '../components/Registration'
const routes ={
    '/':HomePage,
    '/admin': userTable,
    '/login': Login,
    '/register':Registration
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