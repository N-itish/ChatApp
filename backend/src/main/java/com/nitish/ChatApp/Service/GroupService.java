package com.nitish.ChatApp.Service;

import com.nitish.ChatApp.models.Group;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class GroupService {
    private static List<Group> userGroups = new ArrayList<>();
    public GroupService(){}

    public Group setGroupId(Group groups){
        boolean isGroupIdPresent = false;
        UUID uniqueGroupId = UUID.randomUUID();
        for(int i = 0; i< userGroups.size(); i++){
            if(userGroups.get(i).getGroupId() == uniqueGroupId.toString()){
                isGroupIdPresent = true;
                break;
            }
        }
        if(!isGroupIdPresent){
            groups.setGroupId(uniqueGroupId.toString());
            userGroups.add(groups);
        }

        return groups;
    }


    /*
        TODO: need to create entity class and repository to store groups
   */
}
