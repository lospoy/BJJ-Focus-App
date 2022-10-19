<template>
  <header class="bg-at-light-orange text-white">
    <nav
      class="container py-5 px-4 flex flex-column gap-4 items-center sm:flex-row"
    >
      <div class="flex items-center gap-x-4">
        <img
          class="w-20"
          src="../assets/vector/default-monochrome-white.svg"
          alt=""
        />
      </div>
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
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Login' }">Logout</router-link>
      </Slide>
    </nav>
  </header>
</template>

<script>
import { logoutUser } from "../services/userService";
import { useRouter } from "vue-router";
import { Slide } from "vue3-burger-menu"

export default {
    components: {
        Slide
    },

    setup() {
      const router = useRouter();
      const user = JSON.parse(localStorage.getItem("user")) 
      // Logout function
      const logout = async () => {
        await logoutUser();
        router.push({ name: "Login" });
      };    
      return { logout, user, Slide };
    },

};
</script>

<style>
.bm-burger-button {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    width: 30px;
    height: 25px;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
  .bm-burger-bars {
    background-color: #ffffff;
  }
  .line-style {
    position: absolute;
    height: 15%;
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
    background: #cc7317;
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
    background-color: rgb(253, 253, 255); /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.4s; /*0.5 second transition effect to slide in the sidenav*/
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.4);
  }
  .bm-item-list {
    color: #cc7317;
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
