<template>

<v-app-bar color="#292c2d" dark height="40" flat>
  <v-toolbar-title>
    <a href="http://www.bjjfocus.com">
      <img class="w-28" :src="require('../assets/vector/default-gold-white.svg')" alt="bjj focus logo"/>
    </a>
  </v-toolbar-title>

  <!-- LOGOUT -->
  <v-icon v-if="user" class="text-lg pr-6 text-white" :to="{ name: 'Login' }" @click="logout">mdi-exit-to-app</v-icon>
    
</v-app-bar>

</template>

<script>
import { logoutUser } from "../services/userService";
import { useRouter } from "vue-router";
import store from "../store/store"
import { inject } from "vue"        // required for the emitter (EventBus)

export default {
name: 'Navigation',

setup() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("BJJFocusUser"))

  // Emitter (EventBus) this section emits an event that can be listened to globally
  const emitter = inject('emitter')
  const emitLogout = _ => {
      emitter.emit('userHasLoggedOut', true)
  }

  // Logout function
  const logout = async () => {
    logoutUser();
    store.methods.setUser(user)
    
    setTimeout(() => {
        emitLogout()
    }, 1);
    setTimeout(() => {
        router.push({ name: "Login" });
    }, 700);
  };



  return {
    user, logout, emitLogout,
  }
},

};
</script>
