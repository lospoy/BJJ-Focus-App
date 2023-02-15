import { createRouter, createWebHashHistory } from "vue-router";
import Human from "../views/Human.vue";
import Login from "../views/Login.vue";
import PrivateClass from "../views/PrivateClass.vue";
import Progress from "../views/Progress.vue";
import Register from "../views/Register.vue";
import Session from "../views/Session.vue";
import Charts from "../views/student/Charts.vue";
import StudentHome from "../views/student/StudentHome.vue";
import StudentSession from "../views/student/StudentSession.vue";
import StudentSettings from "../views/student/StudentSettings";
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
    path: "/teacher/progress",
    name: "Progress",
    component: Progress,
  },
  {
    path: "/teacher/session",
    name: "Session",
    component: Session,
  },
  {
    path: "/teacher/human",
    name: "Human",
    component: Human,
  },
  {
    path: "/teacher/technique",
    name: "Technique",
    component: Technique,
  },
  {
    path: "/teacher/student-list",
    name: "StudentList",
    component: StudentList,
  },

  // STUDENT ROUTES
  {
    path: "/student/home",
    name: "StudentHome",
    component: StudentHome,
  },
  {
    path: "/student/charts",
    name: "Charts",
    component: Charts,
  },
  {
    path: "/student/private-class",
    name: "PrivateClass",
    component: PrivateClass,
  },
  {
    path: "/student/session",
    name: "StudentSession",
    component: StudentSession,
  },
  {
    path: "/student/settings",
    name: "StudentSettings",
    component: StudentSettings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
