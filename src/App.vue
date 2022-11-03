<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation :key="navRerenderKey" />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import store from "./store/store.js";
import { useRouter } from "vue-router";
import { inject } from "vue"    // required for the emitter (EventBus)

export default {
  components: {
    Navigation,
  },

  setup() {
    // Data & variables
    const appReady = ref(null)
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const navRerenderKey = ref(0)

    // Listener (EventBus) this section listens to the emitters
    const emitter = inject('emitter')
    emitter.on('userHasLoggedIn', (value) => {
        navRerenderKey.value += 1
    })
    emitter.on('userHasLoggedOut', (value) => {
        navRerenderKey.value += 1
    })
    

    if (!user) {
      appReady.value = true;
      store.methods.setUser(user);
      router.push({ name: "Login" });
    } else {
      appReady.value = true;
      store.methods.setUser(user);
      router.push({ name: "ProgressView" });
    }

    return { appReady, user, emitter, navRerenderKey };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
