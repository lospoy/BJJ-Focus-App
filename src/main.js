import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router/router.js";

createStore({
  // state, actions, mutations
});

createApp(App).use(router).mount("#app");
