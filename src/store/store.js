// GLOBAL STORE
// Using Composition API
import { reactive } from "vue";

const state = reactive({
  user: null,
  isLoggedIn: null
});

const student = reactive({
  data: null,
  training: null,
});

const human = reactive({
  loggedHuman: null,
  allHumans: null,
});

const methods = {
  setUser(payload) {
    state.user = payload ? payload : null,
    state.isLoggedIn = state.user ? true : false
  },
  getUser() {
    return JSON.parse(JSON.stringify(state.user))
  },
  checkLogin() {
    return state.isLoggedIn
  },
  setStudent(payload) {
    student.data = payload ? payload : null
  },
  setTraining(payload) {
    student.training = payload ? payload : null
  },
  getStudent() {
    return JSON.parse(JSON.stringify(student))
  },
  setHuman(payload) {
    human.loggedHuman = payload ? payload : null
  },
  setHumanArray(payload) {
    human.allHumans = payload ? payload : null
  },
};

export default {
  state,
  student,
  methods,
};
