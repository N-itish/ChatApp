
import {createRouter,createWebHistory} from "vue-router";
import {store} from './store';
const routes = [
    {
      path: "/",
      name: "home",
      component:() => import(/* webpackChunkName: "homePage" */ "./components/HomePage/HomePage.vue" ),
      meta: {loginRequired: false},
      children:[
            {
                path:"/message",
                name:"message",
                component:()=> import(/* webpackChunckName: "messageComponent" */ "./components/HomePage/MessageComponent.vue")
            },
            {
                path:"/videoChat",
                name:"videoChat",
                component:()=> import(/* webpackChunckName: "messageComponent" */ "./components/HomePage/AdvancedVideo.vue")
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
]

const router =  createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to,from) =>{
    console.log(from);
    //this is for testing only, remove this later
    if(to.meta.loginRequired === true){
        if(!store.getters.authenticated  && to.name !== 'login'){
            console.log('return name is login');
            return {name: 'login'}
        }
    }
});

export default router;