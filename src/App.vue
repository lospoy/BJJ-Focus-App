<template >
  <div class="min-h-screen font-Poppins box-border bg-dark-grey">
    <Navigation />
    <BottomNav :key="appReady" :role='userRole'/>
  </div>
</template>

<script>
import BottomNav from "./components/BottomNav.vue";
import Navigation from "./components/Navigation.vue";
import store from "./store/store.js";
import { useRouter } from "vue-router";
import { inject, ref } from "vue";    // required for the emitter (EventBus)

export default {
  components: {
    BottomNav,
    Navigation
  },

  setup() {
    //  Data & variables
    const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const router = useRouter()
    const userRole = ref('')
    const emitter = inject('emitter')
    const appReady = ref(0) // re-render key

    //  Listener (EventBus) this section listens to the emitters
    //
    //  on user login or logout modifies appReady's value, 
    //  with the intent that this will trigger a re-render of the BottomNav component
    //  Re-render of the component however is not happening
    emitter.on('userHasLoggedIn', (booleanValue) => {
        appReady.value++
        console.log('login')
    })
    emitter.on('userHasLoggedOut', (booleanValue) => {
        appReady.value++
        console.log('logout')
    })

    //  Checks for user on page load
    if (!user) {
      router.push({ name: "Login" });
      store.methods.setUser(user);
    } else {
      store.methods.setUser(user);
      //  If user is logged in, checks for their role to display relevant route and bottom nav bar
      if(user.role.admin) {
        userRole.value = "admin"
        router.push({ name: "Session" });
      }
      if(user.role.student) {
        userRole.value = "student"
        router.push({ name: "StudentHome" });
      }
    }

    return { user, emitter, appReady, userRole };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
@import "~primevue/resources/primevue.min.css";
@import "~primevue/resources/themes/md-dark-deeppurple/theme.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
