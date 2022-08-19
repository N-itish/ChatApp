package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.models.Group;
import com.nitish.ChatApp.Service.GroupService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.nitish.ChatApp.Service.GroupService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Value("${okta.rest.api-token}")
    private String oktaApiToken;

    @Value("${okta.oauth2.issuer}")
    private String oktaUrl;

    @GetMapping("/users")
    public String getUsers(){
        String uri = oktaUrl.split("oauth2")[0]+"api/v1/users";
        //requesting user list from the okta rest api
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","SSWS "+oktaApiToken);
        HttpEntity<String> httpEntity = new HttpEntity<>("body",headers);
        ResponseEntity<String> oktaResponse = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);
        System.out.println(oktaResponse);
        return oktaResponse.getBody();
    }


    @PostMapping("/groups")
    public Group getGroupId(@RequestBody Group groups){
        System.out.println("url has been hit");
        GroupService service = new GroupService();
        return service.setGroupId(groups);
    }

    @GetMapping("/groups")
    public List<Group> getAll(){
        return GroupService.getUserGroups();
    }
}
