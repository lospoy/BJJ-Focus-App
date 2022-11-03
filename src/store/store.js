// Using Composition API

import { reactive } from "vue";

const state = reactive({
  user: null,
  isLoggedIn: null
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
  }
};

export default {
  state,
  methods,
};
