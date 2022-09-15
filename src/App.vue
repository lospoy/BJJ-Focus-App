<template>
  <div v-if="appReady" class="min-h-full font-Poppins box-border ">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import { ref } from 'vue'
import { authHeader } from './services/userService.js'
import store from './store/index.js'

export default {
    components: {
        Navigation,
    },

    setup() {
        // Data & variables
        const appReady = ref(null)

        // Check if user is already logged in
        // If logged in, set auth headers with bearer token
        const userHeader = authHeader()
        const user = JSON.parse(localStorage.getItem('user'))
        // otherwise, make app ready

        if (!user) {
            appReady.value = true
            console.log('No user logged in')
        } else {
            store.methods.setUser(user)
            appReady.value = true
            console.log('User logged in')
        }

        return { appReady }
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
