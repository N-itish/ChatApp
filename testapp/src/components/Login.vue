<template>
    <div id = "LoginComponent">
        <div id = "FormData">
        <form @submit.prevent="submitLogin">
            <label>Email:</label><input type="text" v-model="email"><br>
            <label>Password:</label><input type="password" v-model="password"> <br>  
            <button type="submit">Sign In</button>
        </form>
        </div>
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
<style>
    #FormData{
        margin: auto;
        border: 3px solid black;
        padding: 10px;
        position: absolute;
        top:25%;
        left:35%;
        width: 400px;
        height: 200px;
    }
    label{
        font-size: 20px;
        display: inline-block;
        width: 140px;
        text-align: left;  
    }
    input{
       margin-top:20px;
       height: 30px;
        width : 200px;
        font-size: 20px;
    }
    button{
        margin-top: 45px;
        height: 40px;
        width : 100px;
        font-size: 20px;
        border:none;
        background: blue;
        color: white;
        float: right;
    }

</style>