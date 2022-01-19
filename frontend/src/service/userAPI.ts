import axios from 'axios'

//server url is taken from the environment vairable
export class userAPI{
    static axiosInstance : any;
    constructor(){
        this.setInstance();       
    }
    setInstance() {
       userAPI.axiosInstance = axios.create({
            baseURL: process.env.VUE_APP_SERVER_API + 'api',
            headers:{"Access-Control-Allow-Origin":"*"}
        });
    }

    setAuthToken(token: String){
        if(token){
            userAPI.axiosInstance.defaults.headers.common['Authorization'] = token;
        }
        else{
            delete userAPI.axiosInstance.defaults.headers.common['Authorization']
        }
    }
}

