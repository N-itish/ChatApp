import Vue from "vue";
import Router from "vue-router";
import HomePage from "./components/HomePage.vue";
import AdminPage from "./components/admin/AdminPanel.vue";
import Login from "./components/Login.vue";
import Register from "./components/Registration.vue";


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
            component: AdminPage,
            children:[

            ]
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path:"/register",
            name:"register",
            component: Register
        }
    ]
});

export default router;