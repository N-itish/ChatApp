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

export default {
    name:"LoginComponent",
    data(){
        return{
            url:"https://loaclhost:8080/user/login",
            email:"abc@gmail.com",
            password:""
        }
    },methods:{
        submitLogin(){
            alert(this.email + " : " +this.password)
        }
    }
}
</script>