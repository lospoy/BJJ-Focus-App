<template>
  <nav>
    <!-- STUDENT NAV -->
    <TabMenu
      :model="studentMenu"
      v-if="isStudent"
    />
    <TabMenu
      :model="adminMenu"
      v-if="isAdmin"
    />
  </nav>
  <router-view />
</template>

<script>
import store from "../store/store"
import { ref, onMounted } from "vue"
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

setup() {
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
      to: '/teacher/overview'
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

  onMounted(() => {
    checkRole()
  })


  return {
    store, user,
    // LOGOUT
    logout,
    // TAB MENU
    studentMenu, adminMenu, isAdmin, isStudent, active
  };
},

};
</script>

<style scoped>
  .p-tabmenu.p-component {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    background-color: rgba(41, 44, 45, .5);
    padding-top: 0;
    z-index: 1000;
  }
</style>