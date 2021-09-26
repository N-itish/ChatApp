import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        webSocketIns    : null,
        authenticated   : false,
        textMessage     : '',
        specialCommand  : '',
        baset64Image    : ''
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
        setImage(state,image){
            state.baset64Image = image;
        }
    },
    getters:{
        webSocketIns    : state => state.webSocketIns,
        authenticated   : state => state.authenticated,
        textMessage     : state => state.textMessage,
        baset64Image    : state => state.baset64Image,
        specialCommand  : state => state.specialCommand
    }
});

export default store;