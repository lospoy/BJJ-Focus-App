<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">

    </div>
</template>

<script>
import {ref} from "vue"

export default {
    name: "register",
    setup() {
        // Create data / vars
        const email = ref(null)
        const password = ref(null)
        const confirmPassword = ref(null)
        const errorMsg = ref(null)


        // Register function
        return { email, password, confirmPassword, errorMsg }
    },
}
</script>
