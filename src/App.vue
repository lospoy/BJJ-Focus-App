<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import store from "./store/index.js";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    Navigation,
  },

  setup() {
    // Data & variables
    const appReady = ref(null);
    const router = useRouter()

    // Check if user is already logged in
    // If logged in, set auth headers with bearer token
    const user = JSON.parse(localStorage.getItem("user"));
    // otherwise, make app ready

    // ??? need to manually reload for changes in navigation to render
    if (!user) {
      appReady.value = true;
      console.log("No user logged in");
      router.push({ name: "Login" });
    } else {
      store.methods.setUser(user);
      appReady.value = true;
      console.log("User logged in");
      router.push({ name: "ProgressView" });
    }

    return { appReady, user };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
