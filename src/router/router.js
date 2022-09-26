import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NewHuman from "../views/NewHuman.vue";
import Register from "../views/Register.vue";
import Session from "../views/Session.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/session",
    name: "Session",
    component: Session,
  },
  {
    path: "/newHuman",
    name: "NewHuman",
    component: NewHuman,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
