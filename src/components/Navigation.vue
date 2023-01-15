<template>
  <header class="bg-dark-grey text-white">
    <nav
      class="container py-3 px-4 flex gap-4 items-center sm:flex-row max-w-screen-sm"
    >
      <div class="flex items-center gap-x-4">
        <a href="http://www.bjjfocus.com">
            <img class="w-28" :src="require('../assets/vector/default-gold-white.svg')" alt="bjj focus logo"/>
        </a>
      </div>
      <Slide
        right
        :closeOnNavigation="true"
        width="190"
        class="flex flex-1 justify-end"
      >
        <!-- student routes -->
        <div class="flex flex-row gap-x-2" v-if="user && isStudent">
          <v-icon class="text-lg top-1">mdi-alien</v-icon>
          <router-link :to="{ name: 'PrivateClass' }">Private Class</router-link>
        </div>
        
        <!-- login/logout routes -->
        <div class="flex flex-row gap-x-2" v-if="user">
          <v-icon class="text-lg top-1">mdi-exit-to-app</v-icon>
          <router-link class="cursor-pointer" :to="{ name: 'Login' }" @click="logout">Logout</router-link>
        </div>

        <div class="flex flex-row gap-x-2" v-if="!user">
          <v-icon class="text-lg top-1">mdi-login</v-icon>
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </div>

        <div class="flex flex-row gap-x-2" v-if="!user">
          <v-icon class="text-lg top-1">mdi-triangle</v-icon>
          <router-link :to="{ name: 'Register' }">Sign up</router-link>
        </div> 

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
import { inject, ref } from "vue"        // required for the emitter (EventBus)

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
    width: 1.2rem !important;
    height: 1rem !important;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  .bm-burger-bars {
    background-color: #f7f7f7 !important;
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
    background: #f7f7f7 !important;
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
    background-color: #4b5153 !important;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.4s !important; /*X seconds transition effect to slide in the sidenav*/
  }
  .bm-item-list {
    color: #f7f7f7 !important;
    margin-left: 10%;
    font-size: 16px;
  }
  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.2em;
  }
  .bm-item-list > * > span {
    font-weight: 400;
    color: white;
  }

</style>
