import Vue from "vue";
import VueRouter from "vue-router";
import AuthRequired from "./utils/AuthRequired";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./views/home"),
    redirect: "/app/piaf",
  },
  {
    path: "/app",
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: "/app/piaf",
    beforeEnter: AuthRequired,
    children: [
      {
        path: "piaf",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/piaf"),
        redirect: "/app/piaf/start",
        children: [
          { path: 'start', component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Start') }
        ]
      },
      {
        path: "second-menu",
        component: () =>
          import(/* webpackChunkName: "second-menu" */ "./views/app/second-menu"),
        redirect: "/app/second-menu/second",
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "piaf" */ './views/app/second-menu/Second') }
        ]
      },


      {
        path: "single",
        component: () =>
          import(/* webpackChunkName: "single" */ "./views/app/single")
      }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
