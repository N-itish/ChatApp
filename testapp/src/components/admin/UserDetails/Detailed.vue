<template>
    <div id = "detailedView">
        <label>UserName :</label><input type = "text" v-model="detailedUserInfo.userName"><br>
        <label>Password :</label><input type = "text" v-model="detailedUserInfo.password" readonly><br>
        <label>Email	:</label><input type = "text" v-model="detailedUserInfo.email" readonly><br>  
        <label>Gender	:</label><input type = "text" v-model="detailedUserInfo.gender"><br>
        <label>Dob		:</label><input type = "text" v-model="detailedUserInfo.dob"><br>
        <label>Role		:</label><input type = "text" v-model="detailedUserInfo.role"><br>
        <button v-on:click="updateUserData">Update</button>
    </div>
</template>
<script>
import userAPI from '../../../service/userAPI'
export default {
    name:"userDetails",
    props:{
        userData:Object
    },
    data(){
        return{
            //cloning the props data to an object so it can be modified
            detailedUserInfo:Object.assign({},this.userData),
        }
    },methods:{
        updateUserData(){
            console.log(this.detailedUserInfo);
            const updateData = new FormData();
            updateData.append("userId",		    this.detailedUserInfo.userId)
            updateData.append("userName",		this.detailedUserInfo.userName);
            updateData.append("email",		    this.detailedUserInfo.email);
            updateData.append("gender",		    this.detailedUserInfo.gender);
            updateData.append("dob",			new Date(this.detailedUserInfo.dob));
            updateData.append("password",		this.detailedUserInfo.password);
            updateData.append("role",			this.detailedUserInfo.role);
            userAPI.instance.put('/update',updateData).then((response) =>{
                console.log(response.data);
            })
        }
    }
}
</script>
<style scoped>
#detailedView{
     margin: auto;
        border: 3px solid black;
        padding: 10px;
        position: absolute;
        top:10%;
        left:35%;
        width: 400px;
        height: 450px;
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