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
        <div *ngIF = "error.length > 0">
            {{error}}
        </div>
    </div>
</template>
<script>
import { Users } from '@/models/Users';
import { HttpService } from '@/service/HttpService';
//import {Users} from '../../models/Users.ts'
export default {
    name : "RegComp",
    data(){
        return{
                error:"",
                username:"",
                email:"",
                gender:"",
                dob:"",
                password:""
            }
        
    },methods:{
        sendUserDetails(){
            let self = this;
            //storing all user details into formdata object
            let user = new Users(0,this.username,this.email,this.password,'User',this.gender,this.dob);
            let httpService = new HttpService();
            httpService.httpPost('/users',user).then(error =>{
                if (this.error.length > 0){
                    self.error = error;                    
                }
            });
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