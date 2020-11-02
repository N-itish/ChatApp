import Vue from "vue";
import Router from "vue-router";
import HomePage from "./components/HomePage.vue";


Vue.use(Router);

const router = new Router({
    routes: [
        {
          path: "/",
          name: "home",
          component: HomePage
        },
        {
            path: "/admin",
            name: "admin",
            component: ()=> import(/* webpackChunkName: "admin" */  "./components/admin/AdminPanel.vue")
        },
        {
            path: "/login",
            name: "login",
            component: ()=> import(/* webpackChunkName: "login" */ "./components/Login.vue")
        },
        {
            path:"/register",
            name:"register",
            component: ()=> import(/* webpackChunkName: "register" */ "./components/Registration.vue")
        }
    ]
});

export default router;