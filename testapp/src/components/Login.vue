<template>
    <div id = "LoginComponent">
        <div id = "FormData">
            <label>Email:</label><input type="text" v-model="email" placeholder = "e.g.: abc@gmail.com "><br/>
            <label>Password:</label><input type="password" v-model="password" placeholder = "your password"> <br/>  
            <button  v-on:click = "SignIn">Sign In</button>
        </div>
    </div>
</template>
<script>
import userAPI from '../service/userAPI'
export default {
    name:"LoginComponent",
    data(){
        return{
            email : "",
            password:""
        }
    },
    methods:{
        SignIn(){
            const authToken = 'Basic '+ btoa(this.email+":"+this.password);
            userAPI.setAuthToken(authToken);
            userAPI.instance.post('/login',{}).then((response)=>{
                localStorage.setItem("userAuthentication",response.data);
            });
        },
        
    }
    
}
</script>
<style scoped>
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
        float: right;
    }

</style>