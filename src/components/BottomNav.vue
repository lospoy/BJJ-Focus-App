<template>
    <!-- STUDENT NAV -->
    <TabMenu
      :model="studentMenu"
      v-if="isStudent"
    />
    <TabMenu
      :model="adminMenu"
      v-if="isAdmin"
    />
    <router-view />
</template>

<script>
import store from "../store/store"
import { inject, ref, onMounted } from "vue"        // required for the emitter (EventBus)
import TabMenu from 'primevue/tabmenu';
import { useRouter } from 'vue-router'
import { logoutUser }  from '../services/userService'
import { useUserStore } from "../store/user"

export default {
name: "BottomNav",
props: {
  role: {
    type: Object,
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
  const userStore = useUserStore()
  
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

  const adminMenu = ref([
    {
      icon: 'pi pi-fw pi-home',
      to: '/teacher/progress'
    },
    {
      icon: 'pi pi-fw pi-calendar-plus',
      to: '/teacher/session'
    },
    {
      icon: 'pi pi-fw pi-user-plus',
      to: '/teacher/human'
    },
    {
      icon: 'pi pi-fw pi-sitemap',
      to: '/teacher/technique'
    },
    {
      icon: 'pi pi-fw pi-users',
      to: '/teacher/student-list'
    },
    {
      icon: 'pi pi-fw pi-power-off',
      command:() => {logout()}
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

  // USING PINIA
  function checkRole() {
    if (!userStore.user) {
      return
    }

    if(userStore.user.role.admin) isAdmin.value = true
    if(userStore.user.role.student) isStudent.value = true
  }

  // USING PROPS
  // if(props.role.admin) isAdmin.value = true
  // if(props.role.student) isStudent.value = true

  onMounted(() => {
    checkRole()
  })


  return {
    store, user,
    // LOGOUT
    logout, emitLogout,
    // TAB MENU
    studentMenu, adminMenu, isAdmin, isStudent, active
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