<template>
    <div id ="RegComp">
        <form id = "RegDetails" @submit.prevent= "sendUserDetails">
            UserName:   <input v-model="username" type = "text"><br>
            Email:      <input v-model="email" type = "text"><br>
            Gender:     <input v-model="gender" type = "text"><br>
            DOB:        <input v-model="dob" type="date"><br>
            Password:   <input v-model="password" type = "password"><br>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name : "RegComp",
    data(){
        return{
                username:"",
                email:"",
                gender:"",
                dob:"",
                password:"",
                url:"http://localhost:8090/user/register"
            }
        
    },methods:{
        sendUserDetails(){
           const formData = new FormData();
           formData.append("userName",this.username);
           formData.append("email",this.email);
           formData.append("gender",this.gender);
           formData.append("dob",new Date(this.dob));
           formData.append("password",this.password);
            axios.post(this.url,formData).then((response) =>{
                console.log(response);
            })
        }
    }
}
</script>