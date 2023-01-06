import { createRouter, createWebHistory } from "vue-router";
import Human from "../views/Human.vue";
import Login from "../views/Login.vue";
import PrivateClass from "../views/PrivateClass.vue";
import ProgressView from "../views/ProgressView.vue";
import Register from "../views/Register.vue";
import Session from "../views/Session.vue";
import BalanceBoard from "../views/student/BalanceBoard.vue";
import StudentList from "../views/StudentList.vue";
import Technique from "../views/Technique.vue";

const routes = [
  // ROLE AGNOSTIC/ALL USERS
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  // ADMIN ROUTES
  {
    path: "/progress",
    name: "ProgressView",
    component: ProgressView,
  },
  {
    path: "/session",
    name: "Session",
    component: Session,
  },
  {
    path: "/human",
    name: "Human",
    component: Human,
  },
  {
    path: "/technique",
    name: "Technique",
    component: Technique,
  },
  {
    path: "/student-list",
    name: "StudentList",
    component: StudentList,
  },

  // STUDENT ROUTES
  {
    path: "/balance",
    name: "BalanceBoard",
    component: BalanceBoard,
  },
  {
    path: "/private-class",
    name: "PrivateClass",
    component: PrivateClass,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
