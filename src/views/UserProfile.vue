<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- PROFILE -->
    <form
      @submit.prevent=""
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-orange mb-4 self-center">{{ name }}</h1>

    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { getLoggedUser } from '../services/userService'
import { getHuman } from '../services/humanService'

// components import

export default {
  name: "userProfile",
  setup() {
    // Variables
    const errorMsg = ref(null);
    const name = ref(null)

    // Function
    const getUserName = async () => {
        try {
            const userObject = await getLoggedUser()
            const humanId = userObject.human
            const humanObject = await getHuman(humanId)
            name.value = humanObject.name.first + " " + humanObject.name.last
        } catch (error) {
            errorMsg.value = error.message;
            setTimeout(() => {
              errorMsg.value = null;
            }, 5000);
        }
    }
    getUserName()

    return { name, getUserName, errorMsg };
  },
};
</script>
