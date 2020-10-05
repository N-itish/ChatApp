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
           alert(this.dob)
        }
    }
}
</script>