<template>
    <div id = "userDetais">
        <label>userName :</label><input type = "text" v-model = "userdetails.userName"><br>
        <label>password :</label><input type = "text" v-model = "userdetails.password"><br>
        <label>email	:</label><input type = "text" v-model = "userdetails.email">   <br>  
        <label>gender	:</label><input type = "text" v-model = "userdetails.gender">  <br>
        <label>dob		:</label><input type = "text" v-model = "userdetails.dob">     <br>
        <label>role		:</label><input type = "text" v-model = "userdetails.role">    <br>
        <button>Edit</button>
    </div>
</template>
<script>
export default {
    name:"userDetails"
}
</script>