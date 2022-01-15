<template>
    <div id ="RegComp">
        <div id = "RegistrationForm">
            <form id = "RegDetails" @submit.prevent= "sendUserDetails">
                <label>UserName: </label>  <input v-model="username" type = "text"><br/>
                <label>Email:    </label>  <input v-model="email" type = "text"><br/>
                <label>Gender:   </label>  <input v-model="gender" type = "text"><br/>
                <label>DOB:      </label>  <input v-model="dob" type="date"><br/>
                <label>Password: </label>  <input v-model="password" type = "password"><br/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>
</template>
<script>
import userAPI from '../service/userAPI';
export default {
    name : "RegComp",
    data(){
        return{
                username:"",
                email:"",
                gender:"",
                dob:"",
                password:""
            }
        
    },methods:{
        sendUserDetails(){
            //storing all user details into formdata object
           const formData = new FormData();
           formData.append("userName",this.username);
           formData.append("email",this.email);
           formData.append("gender",this.gender);
           formData.append("dob",new Date(this.dob));
           formData.append("password",this.password);
           formData.append("role","user");
           userAPI.instance.post('/register',formData).then((response) =>{
               console.log(response.data);
               //redirect to login if successful registration
               if(response.data){
                   window.location.href = '/'
               }
           })
        }
    }
}
</script>
<style scoped>
#RegistrationForm{
        margin: auto;
        border: 3px solid black;
        padding: 10px;
        position: absolute;
        top:10%;
        left:35%;
        width: 400px;
        height: 400px;
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