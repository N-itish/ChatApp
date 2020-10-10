<template>
    <component :is="routedComponent"></component>
</template>
<script>
import HomePage from '../components/HomePage';
import userTable from '../components/admin/userTable';
import Login from '../components/Login';
import Registration from '../components/Registration';
import {eventBus} from '../Mediator';
const routes ={
    '/':Login,
    '/homepage':HomePage,
    '/admin': userTable,
    '/login': Login,
    '/register':Registration
}
export default {
   data(){
       return {
           currentURL: window.location.pathname,
           loggedIn:false
       };
   },
   created(){
       eventBus.$on('loginStatus',(response) =>{
           console.log(response);
           this.loggedIn = response;
       })
   },
   computed:{
       routedComponent(){
           //defined all the routes that require login in this variable
           var LogInRequiredPages = ['/homepage','/admin'];

           if(LogInRequiredPages.includes(this.currentURL) && !this.loggedIn){
               return routes['/login']; 
           } 
           else{
                return routes[this.currentURL];
           }
       }
   }
}
</script>