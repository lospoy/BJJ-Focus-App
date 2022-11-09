// Using Composition API

import { reactive } from "vue";

const state = reactive({
  user: null,
  isLoggedIn: null
});

const student = reactive({
  data: null
});

const methods = {
  setUser(payload) {
    state.user = payload ? payload : null,
    state.isLoggedIn = state.user ? true : false
  },
  getUser() {
    return JSON.stringify(state.user)
  },
  checkLogin() {
    return state.isLoggedIn
  },
  setStudent(payload) {
    student.data = payload ? payload : null
  },
  getStudent() {
    return JSON.parse(JSON.stringify(student.data))
  }
};

export default {
  state,
  student,
  methods,
};
