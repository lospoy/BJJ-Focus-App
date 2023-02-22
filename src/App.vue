<template >
  <div class="min-h-screen font-Poppins box-border bg-dark-grey">
    <Navigation />
    <BottomNav :key='userRole' :role='userRole'/>
  </div>
</template>

<script>
import BottomNav from "./components/BottomNav.vue";
import Navigation from "./components/Navigation.vue";
import { useUserStore } from "./store/user"
import { useRouter } from "vue-router";
import { inject, ref } from "vue";    // required for the emitter (EventBus)

export default {
  components: {
    BottomNav,
    Navigation
  },

  setup() {
    //  Data & variables
    const userLocal = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const router = useRouter()
    const userRole = ref({})
    const emitter = inject('emitter')
    const userStore = useUserStore()

    //  Checks for user on page load
    if (!userLocal) {
      router.push({ name: "Login" });
      userStore.setUser(userLocal)
    } else {
      userStore.setUser(userLocal)
      //  If user is logged in, checks for their role to display relevant route and bottom nav bar
      if(userStore.user.role.admin) {
        userRole.value = userStore.user.role
        router.push({ name: "Overview" });
      }
      if(userStore.user.role.student) {
        userRole.value = userStore.user.role
        router.push({ name: "StudentHome" });
      }
    }

    return {
      userLocal, emitter, userRole, userStore
    };
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
