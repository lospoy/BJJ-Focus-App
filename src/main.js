import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router/router.js";

import mitt from "mitt"; // import mitt (EventBus)
const emitter = mitt()  // initialize mitt

import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

createApp(App)
  .use(router)
  .use(VCalendar, {})
  .provide('emitter', emitter)
  .mount("#app");
