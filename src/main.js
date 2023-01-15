// Vue
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router.js"

// Tailwind
import "./assets/tailwind.css"

// ChartKick
import 'chartkick/chart.js'
import VueChartkick from 'vue-chartkick'

// Vuetify
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
loadFonts()

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
  .use(vuetify)
  .mount("#app");

