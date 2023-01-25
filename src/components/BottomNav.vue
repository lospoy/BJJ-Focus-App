<template>

  <!-- STUDENT NAV -->
  <v-bottom-navigation density="compact" v-if="isStudent" class="bg-med-grey text-light-grey">
    <v-btn value="home" :to="{ name: 'StudentHome' }">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn value="charts" :to="{ name: 'Charts' }">
      <v-icon>mdi-chart-box-outline</v-icon>
    </v-btn>
    <v-btn value="studentSession" :to="{ name: 'StudentSession' }">
      <v-icon>mdi-calendar-multiselect</v-icon>
    </v-btn>
    <v-btn value="privateClass" :to="{ name: 'PrivateClass' }">
      <v-icon>mdi-alien</v-icon>
    </v-btn>
  </v-bottom-navigation>

  <!-- ADMIN NAV -->
  <v-bottom-navigation density="compact" v-if="isAdmin">
    <v-btn value="studentList" :to="{ name: 'StudentList' }">
      <v-icon>mdi-account-details</v-icon>
    </v-btn>
    <v-btn value="progress" :to="{ name: 'Progress' }">
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
import store from "../store/store"
import { ref } from "vue"        // required for the emitter (EventBus)

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
  const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
  const isAdmin = ref(null)
  const isStudent = ref(null)
  
  if(props.role === 'admin') isAdmin.value = true
  if(props.role === 'student') isStudent.value = true

  return {
    // Roles
    store, user, isAdmin, isStudent
  };
},
};
</script>
