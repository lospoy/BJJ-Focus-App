<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- PROFILE -->
    <div
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-orange mb-4 self-center">Progress</h1>

    </div>
  </div>
</template>

<script>
import { ref } from "vue";

// components import

export default {
  name: "progressView",
  setup() {
    // Variables
    const errorMsg = ref(null);

    return { errorMsg };
  },
};
</script>
