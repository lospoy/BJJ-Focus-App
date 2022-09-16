<template>
  <header class="bg-at-light-orange text-white">
    <nav class="container py-5 px-4 flex flex-column gap-4 items-center sm:flex-row">
        <div class="flex items-center gap-x-4">
            <img class="w-20" src="../assets/vector/default-monochrome-white.svg" alt="">
        </div>
        <ul class="flex flex-1 justify-end gap-x-10">
        <router-link v-if="user" class="cursor-pointer" :to="{name: 'Home'}">Home</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{name: ''}">Create</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{name: 'Login'}">Login</router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
        </ul>
    </nav>
  </header>
</template>

<script>
import store from '../store/index.js'
import { computed } from 'vue'
import { logoutUser } from '../services/userService'
import { useRouter } from 'vue-router'
export default {
  setup() {
    // ??? need to manually reload for changes in navigation to render

    // Get user from store
    const user = computed(() => store.state.user)
    
    // Setup ref to router
    const router = useRouter()

    // Logout function
    const logout = async () => {
        await logoutUser()
        router.push({ name: "Login" })
    }

    return { logout, user };
  },
};
</script>
