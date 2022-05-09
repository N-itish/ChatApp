package com.nitish.ChatApp.models;

import java.util.*;

public class UserGroups {
    private static Map<UUID,List<String>> groups = new HashMap<>();
    public UserGroups(){}

    public UUID createGroup(String[] group,String groupId) {

        UUID uniqueGroupId;
        //adding new group only if the group does not exists
        if (groupId == null) {
            uniqueGroupId = UUID.randomUUID();
            if(!groups.containsKey(uniqueGroupId)) {
                groups.put(uniqueGroupId, Arrays.asList(group));
            }
        }else{
            uniqueGroupId = UUID.fromString(groupId);
        }
        return uniqueGroupId;
    }

    public List<String> getGroup(String groupId){
        UUID uniqueGroupId = UUID.fromString(groupId);
        return groups.get(uniqueGroupId);
    }

    public Collection<List<String>> getAll(){
        return groups.values();
    }

    /*
        TODO: need to create entity class and repository to store groups
   */
}
