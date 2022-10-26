<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!--- Error handling --->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!--- Login --->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-orange mb-4 self-center">Login</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-orange"
          >Email</label
        >
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-orange"
          >Password</label
        >
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <Button :title='buttonTitle' :color='buttonColor' />

      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }">
        Don't have an account?
        <span class="text-at-light-orange">Register</span>
      </router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../services/userService";
import store from "../store/store"

// components import
import Button from "../components/Button.vue";

export default {
  name: "login",
  components: {
    Button,
  },
  setup() {
    // Tools
    const router = useRouter();

    // Variables
    const email = ref(null);
    const password = ref(null);
    const errorMsg = ref(null);
    let buttonColor = ref(null)
    let buttonTitle = ref("Login")

    // Button success visual feedback
    const buttonSuccess = async () => {
        buttonTitle.value = "Logging in..."
        buttonColor.value = "orange"
    }

    // Login function
    const login = async () => {
        await buttonSuccess()
      try {
        const res = await loginUser({
          email: email.value,
          password: password.value,
        });

        const user = await res.json()

        if (res.status === 200) {
            localStorage.setItem("BJJFocusUser", JSON.stringify(user));
            setTimeout(() => {
                router.push({ name: "ProgressView" })
            }, 600);
        }

      } catch (error) {
        errorMsg.value = "Error: incorrect login";
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return { email, password, errorMsg, login, buttonColor, buttonTitle, buttonSuccess };
  },
};
</script>
