
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
    <!--checking if both email or password is null -->
    <div class="errorPosition" v-if="!email || !password">
      <div class="alert alert-danger">either email or password is null</div>
    </div>
  </div>
</template>
<script>
import userAPI from "../service/userAPI";
import webSocket from "../service/webSocket";
export default {
  name: "LoginComponent",
  data() {
    return {
      email: null,
      password: null,
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

      if (this.email.length > 0 && this.password.length > 0) {
        var self = this;
        /*  converting the email password combination into base64 
                encoded string used for basic authentication with server    */
        const authToken = "Basic " + btoa(this.email + ":" + this.password);
        /*  storing it in axios so that after login so that other request 
                to the server will not require user input for email/password combo  */
        userAPI.setAuthToken(authToken);
        this.websocketInstance = new webSocket();

        /*  storing the username and password in websocket,
                websocket requires seperate authentication than the normal one*/
        this.websocketInstance.setAuth(this.email, this.password);
        userAPI.instance
          .post("/login", {})
          .then(() => {
            //authericating the user once the server responds
            this.$store.commit("setLogin");
            this.$router.push("/");
          })
          .catch(function (error) {
            console.log(error);
            self.error =
              error.response.status +
              " please check your username and password!!";
            console.log(self.error);
          });
      }
    },
    SignUp() {
      this.$router.push("/register");
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
