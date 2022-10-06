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
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'ProgressView' }"
          >Progress</router-link
        >
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'NewHuman' }"
          >Human</router-link
        >
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Technique' }"
          >Technique</router-link
        >
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'Session' }"
          >Session</router-link
        >
        <router-link v-if="user" class="cursor-pointer" :to="{ name: 'UserProfile' }"
          >My Profile</router-link
        >
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "../store/index.js";
import { logoutUser } from "../services/userService";
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    const router = useRouter();

    // Get user from localStorage
    let user = JSON.parse(localStorage.getItem("user"))

    // Logout function
    const logout = async () => {
      await logoutUser();
      router.push({ name: "Login" });
    };

    return { logout, user };
  },
};
</script>
