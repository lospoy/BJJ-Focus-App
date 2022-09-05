import { createApp } from "vue";
import { createStore } from "vuex";
import App from './App.vue'
import router from "./helpers/router.js";
import "./assets/tailwind.css";

createStore({
    // state, actions, mutations
})

createApp(App)
  .use(router)
  .mount("#app")
