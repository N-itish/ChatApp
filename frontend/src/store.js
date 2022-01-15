import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        webSocketIns    : null,
        authenticated   : false,
        textMessage     : '',
        specialCommand  : '',
        sender          : '',
    },
    mutations:{ 
        initWebSocket(state, webSocketIns){
            state.webSocketIns = webSocketIns;
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
        }
    },
    getters:{
        webSocketIns    : state => state.webSocketIns,
        authenticated   : state => state.authenticated,
        textMessage     : state => state.textMessage,
        specialCommand  : state => state.specialCommand,
        sender          : state => state.sender
    }
});

export default store;