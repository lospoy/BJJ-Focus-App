<template>
  <v-app>
  <v-main v-if="appReady" class="min-h-full font-Poppins box-border bg-at-light-orange">
      <v-img
        class="w-screen h-5 mt-4"
        src="./assets/vector/default-gold-white.svg"
      ></v-img>
      <BottomNav :key="navRerenderKey" :role='userRole'/>
  </v-main>
  </v-app>
</template>

<script>
import BottomNav from "./components/BottomNav.vue";
import { ref } from "vue";
import store from "./store/store.js";
import { useRouter } from "vue-router";
import { inject } from "vue"    // required for the emitter (EventBus)

export default {
  components: {
    BottomNav,
  },

  setup() {
    // Data & variables
    const appReady = ref(null)
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const userRole = ref(null)
    const navRerenderKey = ref(0) // works alongside the listener/emitter

    // Listener (EventBus) this section listens to the emitters
    const emitter = inject('emitter')
    emitter.on('userHasLoggedIn', (value) => {
        navRerenderKey.value += 1
        console.log("(emitter) Logged In")
    })
    emitter.on('userHasLoggedOut', (value) => {
        navRerenderKey.value += 1
        console.log("(emitter) Logged Out")
    })

    if (!user) {
      appReady.value = true;
      store.methods.setUser(user);
      router.push({ name: "Login" });
    } else {
      appReady.value = true;
      store.methods.setUser(user);
      // If user logs in, checks for their role to display relevant reoute and bottom nav bar
      if(user.role.admin) {
        userRole.value = "admin"
        router.push({ name: "Session" });
      }
      if(user.role.student) {
        userRole.value = "student"
        router.push({ name: "ProgressView" });
      }
    }

    return { appReady, user, emitter, navRerenderKey, userRole };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
