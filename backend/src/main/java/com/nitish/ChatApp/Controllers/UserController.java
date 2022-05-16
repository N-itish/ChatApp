package com.nitish.ChatApp.Controllers;

import com.nitish.ChatApp.Entity.Users;
import com.nitish.ChatApp.Handlers.Impl.TextHandler;
import com.nitish.ChatApp.Service.UserService;
import com.nitish.ChatApp.models.UserGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

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
        return oktaResponse.getBody();
    }


    @PostMapping("/groups")
    public String getGroupId(@RequestBody String[] groups){
        UserGroups userGroups = new UserGroups();
        String groupId = userGroups.getGroupId(groups);
        System.out.println(groupId);
        return groupId;
    }

}
