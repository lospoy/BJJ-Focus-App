// Vue
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router.js"

// PrimeVue
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import TabMenu from 'primevue/tabmenu'

// Tailwind
import "./assets/tailwind.css"

// ChartKick
import 'chartkick/chart.js'
import VueChartkick from 'vue-chartkick'

// Pinia (state management)
import { createPinia } from 'pinia'
const pinia = createPinia()

// EventBus
import mitt from "mitt"
const emitter = mitt()

// V-Calendar
import VCalendar from 'v-calendar'
import 'v-calendar/dist/style.css'

createApp(App)
  .use(pinia)
  .use(router)
  .component('TabMenu', TabMenu)
  .use(PrimeVue)
  .use(VCalendar, {})
  .use(VueChartkick)
  .provide('emitter', emitter)
  .mount("#app");

