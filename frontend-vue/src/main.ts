import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import router from './router'
import App from './App.vue';
import { store} from './store';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { createApp } from "vue";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//adding fontaweome icons here
library.add(faTrash);
const app = createApp(App);
app.component('font-awesome-icon',FontAwesomeIcon);
//app.use(BootstrapVue);
app.use(store);
app.use(router);
app.mount('#app');
// new Vue({
//   store,
//   router,
//   render:(h:any) => h(App),
// }).$mount('#app');

