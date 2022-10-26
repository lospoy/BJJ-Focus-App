<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import store from "./store/store.js";
import { useRouter } from "vue-router";
import { getLoggedUser } from "./services/userService"

export default {
  components: {
    Navigation,
  },

  setup() {
    // Data & variables
    const appReady = ref(null);
    const router = useRouter()

    // Check if user is already logged in
    // const user = getLoggedUser()

    // ******************************************************************
    // ISSUE
    // ******************************************************************
    // Authentication does not work as intended
    // localStorage stores an empty object and that's being accepted by the app as a "logged in user"
    // instead, the app should try to retrieve a logged user and otherwise pull up the login screen.
    //
    // Fortunately, the API still requires a valid token, I just don't know where the app is getting it from
    // ******************************************************************

    const user = JSON.parse(localStorage.getItem("user"));

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
