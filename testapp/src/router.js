import Vue from "vue";
import Router from "vue-router";
import HomePage from "./components/HomePage/HomePage.vue";
//import Camera from "./components/video/Camera.vue";
import Store from './store';

Vue.use(Router);

const router = new Router({
    mode:"history",
    routes: [
        {
          path: "/",
          name: "home",
          component: HomePage,
          meta: {loginRequired: true}
        },
        {
            path: "/admin",
            name: "admin",
            component: ()=> import(/* webpackChunkName: "admin" */  "./components/admin/AdminPanel.vue"),
            meta: {loginRequired: true},
            children:[
                {
                    path:"/list",
                    name:"list",
                    component:()=> import(/* webpackChunkName: "userList" */ "./components/admin/UserDetails/List.vue")
                },
                {
                    path:"/changePassword",
                    name:"changePassword",
                    component: ()=> import(/* webpackChunkName: "userList" */ "./components/admin/UserDetails/Password.vue")
                },
                {
                    path:"/details",
                    name:"details",
                    component: ()=> import(/* webpackChunkName: "userList" */ "./components/admin/UserDetails/Detailed.vue")
                }
            ]
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
        },
        {
            path:"/camera",
            name:"camera",
            component: ()=> import(/* webpackChunkName: "camera" */ "./components/HomePage/Camera.vue")
        },
        {
            path:"/register",
            name:"register",
            component:()=> import(/* webpackChunkName: "register" */ "./components/Registration.vue")
        },
        {
            path:"/video",
            name:"video",
            component:()=> import(/* webpackChunkName: "video" */ "./components/HomePage/Video.vue"),
            meta: {loginRequired: true}
        }
    ]
});

router.beforeEach((to,from,next)=>{
    console.log(Store.getters.authenticated);
    if(to.meta.loginRequired){
        if(!Store.getters.authenticated){
            next({
                name:"login",
            });
        }else{
            next();
        }
    }else{
        next();
    }
})
export default router;