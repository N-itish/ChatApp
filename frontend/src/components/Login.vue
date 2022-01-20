
<template>
  <div id="LoginComponent">
    <div id="FormData">
      <label>Email:</label
      ><input
        type="text"
        v-model="email"
        placeholder="e.g.: abc@gmail.com "
      /><br />
      <label>Password:</label
      ><input type="password" v-model="password" placeholder="your password" />
      <br />
      <button v-on:click="SignIn">Sign In</button>
      <button v-on:click="SignUp">Sign Up</button>
    </div>
    <div class="errorPosition" v-if="error.length > 0">
      <div class="alert alert-danger">
        {{ error }}
      </div>
    </div>
  </div>
</template>
<script>
import { HttpService } from '@/service/HttpService';
import  { userAPI } from "../service/userAPI";
import webSocket from "../service/webSocket";
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      websocketInstance: null,
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_SERVER_API);
  },
  methods: {
    SignIn() {
      //Signing in if and only if both email and password are not empty
      let self = this;
      if (this.email.length > 0 && this.password.length > 0) {
        let httpservice = new HttpService();
        this.setTokens(this.email, this.password);
        httpservice.httpPost("/login",{}).then(result =>{
            if(result.length > 3) {
              self.error = result;
            }else{
              self.error = result + " please check your username and password!!";
            }
          //only go to homepage if there are no errors
          if(this.error.length <= 0){
            self.$store.commit("setLogin");
            self.$router.push("/");
          }
        });
      } else {
        this.error = "either email or password is empty";
      }
    },
    SignUp() {
      this.$router.push("/register");
    },
    setTokens(email, password) {
      let api = new userAPI()
      /*  converting the email password combination into base64 
                    encoded string used for basic authentication with server    */
      const authToken = "Basic " + btoa(email + ":" + password);
      /*  storing it in axios so that after login so that other request 
                    to the server will not require user input for email/password combo  */
      api.setAuthToken(authToken);
      this.websocketInstance = new webSocket();

      /*  storing the username and password in websocket,
                    websocket requires seperate authentication than the normal one*/
      this.websocketInstance.setAuth(email, password);
    },
  },
};
</script>
<style scoped>
.errorPosition {
  margin-top: 28%;
  padding: 10px;
  margin-left: 25%;
  margin-right: 25%;
}
#FormData {
  margin: auto;
  border: 3px solid rgb(75, 52, 52);
  padding: 10px;
  position: absolute;
  top: 25%;
  left: 35%;
  width: 400px;
  height: 200px;
}
label {
  font-size: 20px;
  display: inline-block;
  width: 140px;
  text-align: left;
}
input {
  margin-top: 20px;
  height: 30px;
  width: 200px;
  font-size: 20px;
}
button {
  margin-top: 45px;
  height: 40px;
  margin-left: 20px;
  width: 100px;
  float: right;
}
</style>
