
<template>
    <component :is="routedComponent"></component>
</template>
<script>
import UserList from '../components/admin/UserDetails/UserList';
import UserDetails from '../components/admin/UserDetails/UserDetails';
import {eventBus} from '../Mediator'
const routes ={
    '/userDetails': UserDetails,
    '/userList': UserList,
}
export default {
   data(){
       return {
           currentURL: window.location.pathname,
           displayDetails:false
       };
   },
   created(){
       eventBus.$on("showDetails",(data)=>{
           this.displayDetails = data;
       })
   },
   computed:{
       routedComponent(){
           if(!this.displayDetails){
                return routes['/userList'];
           }else{
                return routes['/userDetails']
           }
       }
   }
}
</script>