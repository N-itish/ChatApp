<template>
    <div id = "LoginComponent">
        <form @submit.prevent="submitLogin">
            <input type="text" v-model="email"><br>
            <input type="password" v-model="password"> <br>  
            <button type="submit">Sign In</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"LoginComponent",
    data(){
        return{
            url:"http://localhost:8090/user/login",
            email:"abc@gmail.com",
            password:""
        }
    },methods:{
        submitLogin(){
            const formData = new FormData();
            formData.append('email',this.email);
            formData.append('password',this.password);
          
           axios.post(this.url,formData).then((response) => {
          console.log(response.data)
         });
        }
    }
}
</script>