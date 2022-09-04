<template>
  <header class="bg-at-light-orange text-white">
    <nav class="container py-5 px-4 flex flex-column gap-4 items-center sm:flex-row">
        <div class="flex items-center gap-x-4">
            <img class="w-20" src="../assets/vector/default-monochrome-white.svg" alt="">
        </div>
        <ul class="flex flex-1 justify-end gap-x-10"></ul>
        <router-link class="cursor-pointer" :to="{name: 'Home'}">Home</router-link>
        <router-link class="cursor-pointer" :to="{name: ''}">Create</router-link>
        <router-link class="cursor-pointer" :to="{name: 'Login'}">Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {
    // Get user from store

    // Setup ref to router

    // Logout function

    return {};
  },
};
</script>
