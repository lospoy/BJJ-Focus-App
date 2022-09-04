<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!--- Error handling --->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!--- Register --->
    <form class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
        <h1 class="text-3xl text-at-light-orange mb-4 self-center">Register</h1>

        <div class="flex flex-col mb-2">
            <label for="email" class="mb-1 text-sm text-at-light-orange">Email</label>
            <input
                type="text"
                required class="p-2 text-gray-500 focus:outline-none"
                id="email"
                v-model="email"
            />
        </div>

        <div class="flex flex-col mb-2">
            <label for="password" class="mb-1 text-sm text-at-light-orange">Password</label>
            <input
                type="password"
                required class="p-2 text-gray-500 focus:outline-none"
                id="password"
                v-model="password"
            />
        </div>

        <div class="flex flex-col mb-2">
            <label for="confirmPassword" class="mb-1 text-sm text-at-light-orange">Confirm Password</label>
            <input
                type="password"
                required class="p-2 text-gray-500 focus:outline-none"
                id="confirmPassword"
                v-model="confirmPassword"
            />
        </div>

        <div class="flex flex-col mb-2">
            <label for="humanId" class="mb-1 text-sm text-at-light-orange">id</label>
            <input
                type="text"
                required class="p-2 text-gray-500 focus:outline-none"
                id="humanId"
                v-model="humanId"
            />
        </div>

        <Button title="Register"/>

        <router-link class="text-sm mt-6 text-center" :to="{name: 'Login'}">
            Already have an account? <span class="text-at-light-orange">Login</span>
        </router-link>

    </form>
  </div>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"

import Button from '../components/Button.vue'

export default {
  name: "register",
  components: {
    Button
  },
  setup() {
    // Create data / vars
    const email = ref(null)
    const password = ref(null)
    const confirmPassword = ref(null)
    // humanId will be pre-populated via SMS
    // if via email then email also pre-populated
    const humanId = ref(null)
    const errorMsg = ref(null)

    // Register function
    const register = async () => {
        if(password.value === confirmPassword.value) {
            try {
                
            } catch (error) {
                
            }
        } else {
            errorMsg.value = "Passwords do not match"
            setTimeout(() => {
                errorMsg.value = null
            }, 5000)
        }
    }

    return { email, password, confirmPassword, humanId, errorMsg };
  },
};
</script>
