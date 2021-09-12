import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        webSocketIns: null,
        authenticated : false
    },
    mutations:{ 
        initWebSocket(state, webSocketIns){
            state.webSocketIns = webSocketIns;
        },
        setLogin(state){
            state.authenticated = true;
        }
    },
    getters:{
        webSocketIns    : state => state.webSocketIns,
        authenticated   : state => state.authenticated
    }
});

export default store;