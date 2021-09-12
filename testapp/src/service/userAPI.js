import axios from 'axios'

//server url is taken from the environment vairable

const instance = axios.create({
        baseURL: process.env.VUE_APP_SERVER_API + 'user',
        headers:{"Access-Control-Allow-Origin":"*"}
})
      
const setAuthToken = function(token){
    if(token){
        instance.defaults.headers.common['Authorization'] = token;
    }else{
        delete instance.defaults.headers.common['Authorization'] 
    }
}

export default {instance,setAuthToken};