// Vue
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router.js"

// Tailwind
import "./assets/tailwind.css"

// ChartKick
import 'chartkick/chart.js'
import VueChartkick from 'vue-chartkick'

// EventBus
import mitt from "mitt"
const emitter = mitt()

// V-Calendar
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

createApp(App)
  .use(router)
  .use(VCalendar, {})
  .use(VueChartkick)
  .provide('emitter', emitter)
  .mount("#app");

