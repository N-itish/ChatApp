import { createStore } from 'vuex';

export const store = createStore({
    state:{
        webSocketIns    : null,
        authenticated   : false,
        imageUrl        : '',
        textMessage     : '',
        specialCommand  : '',
        sender          : '',
        recievers       : []
    },getters:{
        webSocketIns    : state => state.webSocketIns,
        authenticated   : state => state.authenticated,
        textMessage     : state => state.textMessage,
        specialCommand  : state => state.specialCommand,
        sender          : state => state.sender,
        reciever        : state => state.recievers,
        imageUrl        : state => state.imageUrl
    },mutations:{
        initWebSocket(state, webSocketIns){
            state.webSocketIns = webSocketIns;
        },
        setImageUrl(state,imageUrl){
            state.imageUrl = imageUrl;
        },
        setLogin(state){
            state.authenticated = true;
        },
        setMessage(state,message){
            state.textMessage = message;
        },
        setCommand(state,command){
            state.specialCommand = command;
        },
        setSender(state,sender){
            state.sender = sender;
        },
        //mutations for reciever array
        addReciever(state,reciever){
            if(state.recievers.indexOf(reciever) === -1){
                state.recievers.push(reciever);
            }
        },
        removeReciever(state,reciever){
            state.recievers.splice(state.recievers.indexOf(reciever),1);
        }
    }
})


