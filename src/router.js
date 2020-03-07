import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ActivatePage from "./pages/activate";
import SearchPage from "./pages/search";
import ServicePage from "./pages/service";
import OpenPage from "./pages/open";
import ProfilePage from "./pages/profile";



Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
      beforeEnter: (to, from, next) => {
        if (!store.state.token) return next("/login");
        else return next();
      }
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        if (store.state.token && store.state.user) return next("/");
        else return next();
      }
    },
    {
      path: "/signup",
      name: "SignUpPage",
      component: SignUpPage,
      beforeEnter: (to, from, next) => {
        if (store.state.token && store.state.user) return next("/");
        else return next();
      }
    },
    {
      path: "/activate",
      name: "ActivatePage",
      component: ActivatePage,
      beforeEnter: (to, from, next) => {
        if (!store.state.user) return next("/login");
        else return next();
      }
    },
    {
      path: "/search/",
      name: "SearchPage",
      component: SearchPage,
      beforeEnter: (to, from, next) => {
        if (!store.state.user) return next("/login");
        else return next();
      }
    },
    {
      path: "/service/:service",
      name: "ServicePage",
      component: ServicePage,
      beforeEnter: (to, from, next) => {
        if (!store.state.user) return next("/login");
        else return next();
      }
    },
    {
      path: "/open",
      name: "OpenPage",
      component: OpenPage,
      beforeEnter: (to, from, next) => {
        if (!store.state.user) return next("/login");
        else return next();
      }
    },
    {
      path: "/profile",
      name: "ProfilePage",
      component: ProfilePage,
      beforeEnter: (to, from, next) => {
        if (!store.state.user) return next("/login");
        else return next();
      }
    }
  ]
});

export default router;
