import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import NewHuman from "../views/NewHuman.vue";
import Progress from "../views/Progress.vue";
import Register from "../views/Register.vue";
import Session from "../views/Session.vue";
import Technique from "../views/Technique.vue";
import UserProfile from "../views/UserProfile.vue";

const routes = [
  {
    path: "/progress",
    name: "Progress",
    component: Progress,
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
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/technique",
    name: "Technique",
    component: Technique,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
