package com.nitish.ChatApp.Service;

import com.nitish.ChatApp.models.Group;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class GroupService {
    private static List<Group> userGroups = new ArrayList<>();
    public GroupService(){}

    public static List<Group> getUserGroups() {
        return userGroups;
    }

    public Group setGroupId(Group groups){
        System.out.println("group creation begun");
        boolean isGroupIdPresent = false;
        UUID uniqueGroupId = UUID.randomUUID();
        //loop through the list to check if the same receivers are present
        Arrays.sort(groups.getRecievers());
        for(int i = 0;i<userGroups.size();i++){
            isGroupIdPresent = Arrays.equals(userGroups.get(i).getRecievers(),groups.getRecievers());
            //if same then nil UUID is generated for the group and it is not store in userGroups
            if(isGroupIdPresent){
                uniqueGroupId = new UUID(0,0);
                break;
            }
        }
        //setting the uuid in group
        groups.setGroupId(uniqueGroupId.toString());
        if(!isGroupIdPresent){
            userGroups.add(groups);
        }
        System.out.println(groups.getGroupId());
        return groups;
    }
    /*
        TODO: need to create entity class and repository to store groups
   */
}
