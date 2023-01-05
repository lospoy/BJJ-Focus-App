<template>
  <v-bottom-navigation>
    
    <router-link v-if="user && isAdmin" class="cursor-pointer grid" :to="{ name: 'NewHuman' }">
      <v-btn value="recent">
        <v-icon>mdi-history</v-icon>
        Recent
      </v-btn>
    </router-link>

    <v-btn value="favorites">
      <v-icon>mdi-heart</v-icon>

      Favorites
    </v-btn>

    <v-btn value="nearby">
      <v-icon>mdi-map-marker</v-icon>

      Nearby
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { logoutUser } from "../services/userService";
import { useRouter } from "vue-router";
import store from "../store/store"
import { getHuman } from "../services/humanService"
import { inject, ref } from "vue"        // required for the emitter (EventBus)

export default {
    setup() {
    // VARIABLES
    const router = useRouter();
    const humanName = ref(null)
    const isAdmin = ref(null)
    const isStudent = ref(null)
    let user = JSON.parse(localStorage.getItem("BJJFocusUser"))

    // On-login the app does some checks
    if(user) {
        // Gets currently logged human's name and assigns to the variable
        const getHumanName = async () => {
            const res = await getHuman(user.human)
            humanName.value = `${res.name.first} ${res.name.last}`
        }
        getHumanName()
        // If user logs in, checks for their role to display relevant routes
        isAdmin.value = user.role.admin
        isStudent.value = user.role.student
    }

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
      return { logout, store, user, isAdmin, isStudent, emitLogout, humanName };
    },

};
</script>
