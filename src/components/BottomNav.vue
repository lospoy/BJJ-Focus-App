<template>
    <!-- STUDENT NAV -->
    <TabMenu
      :model="studentMenu"
      v-if="isStudent"
    />
    <router-view />
</template>

<script>
import store from "../store/store"
import { inject, ref } from "vue"        // required for the emitter (EventBus)
import TabMenu from 'primevue/tabmenu';

export default {
name: "BottomNav",
props: {
  role: {
    type: String,
    required: true,
  },
  components: {
    TabMenu
  }
},

setup(props) {
  // VARIABLES
  const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
  const router = useRouter();
  const isAdmin = ref(null)
  const isStudent = ref(null)
  const active = ref(3)
  
  // TabMenu
  const studentMenu = ref([
    {
      icon: 'pi pi-fw pi-home',
      to: '/student/home'
    },
    {
      icon: 'pi pi-fw pi-chart-bar',
      to: '/student/charts'
    },
    {
      icon: 'pi pi-fw pi-calendar',
      to: '/student/session'
    },
    {
      icon: 'pi pi-fw pi-cog',
      to: '/student/settings'
    },
  ])


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


  if(props.role === 'admin') isAdmin.value = true
  if(props.role === 'student') isStudent.value = true


  return {
    store, user,
    // LOGOUT
    logout, emitLogout,
    // TAB MENU
    studentMenu, isAdmin, isStudent, active
  };
},

};
</script>

<style scoped>
  .p-tabmenu {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .p-menuitem-icon {
    font-size: 1.8rem;
  }
</style>