import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router/router.js";

import mitt from "mitt"; // import mitt (EventBus)
const emitter = mitt()  // initialize mitt




createStore({
  // state, actions, mutations
});

createApp(App).use(router).provide('emitter', emitter).mount("#app");
