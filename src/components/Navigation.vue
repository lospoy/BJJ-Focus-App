<template>
  <header class="bg-at-light-orange text-white">
    <nav
      class="container py-5 px-4 flex flex-column gap-4 items-center sm:flex-row"
    >
      <div class="flex items-center gap-x-4">
        <img
          class="w-32"
          src="../assets/vector/default-monochrome-white.svg"
          alt="bjj focus logo"
        />
      </div>
      <!-- DELETE -->
      <!-- DELETE -->
      <!-- <span class="flex flex-2 justify-end" v-if="user">{{store.state.user.role}}{{store.state.user.email}}</span> -->
      <!-- DELETE -->
      <!-- DELETE -->
      <Slide
        right
        :closeOnNavigation="true"
        width="200"
        class="flex flex-1 justify-end gap-x-10"
      >
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'ProgressView' }">Progress</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'NewHuman' }">Human</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Technique' }">Technique</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Session' }">Session</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'UserProfile' }">My Profile</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }">Login</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Login' }" @click="logout">Logout</router-link>
      </Slide>
    </nav>
  </header>
</template>

<script>
import { logoutUser } from "../services/userService";
import { useRouter } from "vue-router";
import { Slide } from "vue3-burger-menu"
import store from "../store/store"
import { inject } from "vue"        // required for the emitter (EventBus)

export default {
    components: {
        Slide
    },

    setup() {
    // Emitter (EventBus) this section emits an event that can be listened to globally
    const emitter = inject('emitter')
    const emitLogout = _ => {
        emitter.emit('userHasLoggedOut', true)
    }

      const router = useRouter();
      let user = JSON.parse(localStorage.getItem("BJJFocusUser"))

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
      return { logout, Slide, store, user, emitLogout };
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
    background: #cc7317 !important;
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
    background-color: rgb(253, 253, 255) !important; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.4s !important; /*0.5 second transition effect to slide in the sidenav*/
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.4) !important;
  }
  .bm-item-list {
    color: #cc7317 !important;
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
