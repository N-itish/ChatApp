import axios from 'axios'


const instance = axios.create({
        baseURL:'http://localhost:8090/user'
})
      
const setAuthToken = function(token){
    if(token){
        instance.defaults.headers.common['Authorization'] = token;
    }else{
        delete instance.defaults.headers.common['Authorization'] 
    }
}

export default {instance,setAuthToken};