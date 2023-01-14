<template>
  <header class="bg-at-light-orange text-white">
    <nav
      class="container py-5 px-4 flex flex-column gap-4 items-center sm:flex-row"
    >
      <div class="flex items-center gap-x-4">
        <a href="http://www.bjjfocus.com">
            <img class="w-32" src="../assets/vector/default-gold-white.svg" alt="bjj focus logo"/>
        </a>
      </div>
      <Slide
        right
        :closeOnNavigation="true"
        width="200"
        class="flex flex-1 justify-end"
      >
        <span class="rounded-md bg-at-light-orange mr-7 text-white p-1.5 mb-4 justify-center" v-if="user">{{ humanName }}</span>
        
        <!-- student routes -->
        <router-link v-if="user && isStudent" class="cursor-pointer" :to="{ name: 'ProgressView' }">Progress</router-link>
        <router-link v-if="user && isStudent" class="cursor-pointer" :to="{ name: 'PrivateClass' }">Private Class</router-link>

        <!-- admin routes -->
        <router-link v-if="user && isAdmin" class="cursor-pointer" :to="{ name: 'Session' }">Session</router-link>
        <router-link v-if="user && isAdmin" class="cursor-pointer" :to="{ name: 'Student' }">Student</router-link>
        <router-link v-if="user && isAdmin" class="cursor-pointer" :to="{ name: 'NewHuman' }">Human</router-link>
        <router-link v-if="user && isAdmin" class="cursor-pointer" :to="{ name: 'Technique' }">Technique</router-link>
        
        <!-- login/logout routes -->
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Login' }" @click="logout">Logout</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }">Login</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Register' }">Sign up</router-link>

        <!-- not in use currently -->
        <!-- <router-link v-if="user" class="cursor-pointer" :to="{ name: 'UserProfile' }">My Profile</router-link> -->
      </Slide>
    </nav>
  </header>
</template>

<script>
import { logoutUser } from "../services/userService";
import { useRouter } from "vue-router";
import { Slide } from "vue3-burger-menu"
import store from "../store/store"
import { getHuman } from "../services/humanService"
import { inject, ref } from "vue" // inject is required for the emitter (EventBus)

export default {
    components: {
        Slide
    },

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
      return { logout, Slide, store, user, isAdmin, isStudent, emitLogout, humanName };
    },

};
</script>

<style>
.bm-burger-button {
    position: -webkit-sticky !important; /* Safari */
    position: sticky !important;
    width: 30px;
    height: 25px;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  .bm-burger-bars {
    background-color: #ffffff !important;
  }
  .line-style {
    position: absolute;
    height: 15% !important;
    left: 0;
    right: 0;
  }
  .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }
  .bm-cross {
    background: #d85a3b !important;
  }
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    right: 0;
    background-color: #fff4f0 !important; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.4s !important; /*0.5 second transition effect to slide in the sidenav*/
  }
  .bm-item-list {
    color: #d85a3b !important;
    margin-left: 10%;
    font-size: 20px;
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
  }
  .bm-item-list > * > span {
    margin-left: 10px;
    font-weight: 700;
    color: white;
  }

</style>
