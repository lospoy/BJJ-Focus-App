<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation :key="state" />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { ref, reactive } from "vue";
import store from "./store/store.js";
import { useRouter } from "vue-router";

export default {
  components: {
    Navigation,
  },

  setup() {
    // Data & variables
    const appReady = ref(null);
    const router = useRouter()

    const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const state = store.methods.setUser(user)

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

    return { appReady, user, state };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
