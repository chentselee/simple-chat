import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Chat from "../views/Chat.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    beforeEnter(to, from, next) {
      if (!store.state.username) {
        next("/");
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
