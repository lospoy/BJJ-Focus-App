<template>

    <!-- STUDENT NAV -->
    <v-bottom-navigation density="compact" v-if="isStudent">

      <v-btn value="recent" to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn value="balanceBoard" :to="{ name: 'BalanceBoard' }">
        <v-icon>mdi-chart-box-outline</v-icon>
      </v-btn>

      <v-btn value="privates" :to="{ name: 'PrivateClass' }">
        <v-icon>mdi-brain</v-icon>
      </v-btn>

      <v-btn value="sessionHistory">
        <v-icon>mdi-calendar-multiselect</v-icon>
      </v-btn>
      
      <v-btn value="settings">
        <v-icon>mdi-nut</v-icon>
      </v-btn>

    </v-bottom-navigation>

    <!-- ADMIN NAV -->
    <v-bottom-navigation density="compact" v-if="isAdmin">

      <v-btn value="studentList" :to="{ name: 'StudentList' }">
        <v-icon>mdi-account-details</v-icon>
      </v-btn>

      <v-btn value="studentProgress" :to="{ name: 'ProgressView' }">
        <v-icon>mdi-account-search</v-icon>
      </v-btn>

      <v-btn value="session" :to="{ name: 'Session' }">
        <v-icon>mdi-calendar-plus</v-icon>
      </v-btn>
      
      <v-btn value="human" :to="{ name: 'Human' }">
        <v-icon>mdi-human</v-icon>
      </v-btn>

      <v-btn value="technique" :to="{ name: 'Technique' }">
        <v-icon>mdi-chess-pawn</v-icon>
      </v-btn>

    </v-bottom-navigation>

    <router-view></router-view>
</template>

<script>
import { logoutUser } from "../services/userService";
import { useRouter } from "vue-router";
import store from "../store/store"
import { inject, ref, onMounted } from "vue"        // required for the emitter (EventBus)

export default {
  name: "BottomNav",
  props: {
    role: {
      type: String,
      required: true,
    }
  },
  setup(props) {
  // VARIABLES
  const router = useRouter();
  const isAdmin = ref(null)
  const isStudent = ref(null)
  let user = JSON.parse(localStorage.getItem("BJJFocusUser"))
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

    onMounted(() => {
      if(props.role === 'admin') isAdmin.value = true
      if(props.role === 'student') isStudent.value = true
    })

    return {
      logout, store, user, isAdmin, isStudent, emitLogout
    };
  },

};
</script>
