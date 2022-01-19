import { Users } from "@/models/Users";
import { userAPI } from "./userAPI";


export class HttpService {
    constructor(private httpService: userAPI) {

    }

    async httpGet(url: String) {
        let userList: Users[] = [];
        try{
            await userAPI.axiosInstance.get(url).then((response: any) => {
                userList = response.data;
            })
        }catch(error){
            console.log(error)
        }
        return userList;
    }

    async httpPost(url: string, data: any) {
        let error : string  = "";
        await userAPI.axiosInstance.post(url, data).then(() => {
            //authericating the user once the server responds
            console.log("requesting authentication....");
        }).catch(function (errorResponse: any) {
            if (!errorResponse.response) {
                error = "Network Error, pls try again later";
            } else {
                error = errorResponse.response.status + " please check your username and password!!";
            }
        });
        return error;
    }

}