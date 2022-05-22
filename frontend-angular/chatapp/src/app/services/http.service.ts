import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Group } from "../shared/group.model";
import {CustomHeaders} from "../shared/headers.model";
const baseUrl:string = 'http://localhost:9001/api/';
@Injectable()
export class HttpService{
    constructor(
        private httpClient:HttpClient){}

    public httpGet(endpoint:string){
        const url = baseUrl+endpoint;
        return this.httpClient.get(url);
    }

    public httpPost(endpoint:string,data: Group,customHeaders:CustomHeaders[],
        customResponseType?:any){
        const url = baseUrl+endpoint;
        if(customResponseType){
            return this.httpClient.post(url,data,{headers:this.getHeaders(customHeaders),responseType:customResponseType})
        }
        return this.httpClient.post(url,data,{headers:this.getHeaders(customHeaders)})
    }

    private getHeaders(customHeaders:CustomHeaders[]):HttpHeaders{
        let httpHeaders:HttpHeaders = new HttpHeaders();
        customHeaders.forEach(header =>{
            httpHeaders = httpHeaders.append(header.key,header.value);
        })
        console.log(httpHeaders);
        return httpHeaders;
    }
}

