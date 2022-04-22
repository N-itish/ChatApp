<template>
    <div id = "password-vue">
        <div id = "passwordForm">
            <label>UserName:        </label>    <input  type="text">                                <br/>
            <label>New Password:    </label>    <input  type="password" v-model = "newPassword">    <br/>
            <label>Conform Password:</label>    <input  type="password" v-model = "conformPassword"><br/>
            <button  id="sendChangeRequest" @click="changePassword">Conform</button>
        </div>
    </div>
</template>
<script>
export default {
    name:"password-vue",
    data(){
        return{
            newPassword:null,
            conformPassword:null
        }
    },methods:{
        changePassword(){
            if(this.newPassword === this.conformPassword){
                alert('passwords match')
            }
        }
    }
}
</script>
<style scoped>
    #sendChangeRequest{
        float: right;
        margin: 20px;
        padding: 10px;
  }
  #passwordForm{
      margin: auto;
        border: 3px solid black;
        padding: 10px;
        position: absolute;
        top:25%;
        left:35%;
        width: 400px;
        height: 250px;
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
</style>