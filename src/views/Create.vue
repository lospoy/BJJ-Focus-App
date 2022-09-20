<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <!-- Status Message -->
        <div
            v-if="statusMsg || errorMsg"
            class="mb-10 p-4 bg-light-grey rounded-md shadow-lg"
        >
            <p class="text-at-light-orange">
                {{ statusMsg }}
            </p>
            <p class="text-red-500 shadow-lg">
                {{ errorMsg }}
            </p>
        </div>

        <!-- Create -->
        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
            <!-- Form -->
            <form class="flex flex-col gap-y-2 w-full">
                <h1 class="text-2xl text-at-light-orange">Save Session</h1>

                <!-- Teacher -->
                <div class="flex flex-col"></div>
                <label for="teacher" class="text-sm text-at-light-orange">
                    Teacher
                </label>
                <select
                    required
                    class="p-2 text-grey-500 focus:outline-none"
                    id="teacher"
                    v-model="teacher"
                >
                <option value="carlos-campoy">Carlos Campoy</option>
                </select>

                <!-- Topic -->
                <div class="flex flex-col"></div>
                <label for="topic" class="text-sm text-at-light-orange">
                    Topic
                </label>
                <input
                    type="text"
                    required
                    class="p-2 text-grey-500 focus:outline-none"
                    id="topic"
                    v-model="topic"
                />

                <!-- Students -->
                <div class="flex flex-col"></div>
                <label for="students" class="text-sm text-at-light-orange">
                    Students
                </label>
                <input
                    type="text"
                    required
                    class="p-2 text-grey-500 focus:outline-none"
                    id="students"
                    v-model="students"
                />

                
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'create',
    setup() {
        // Create data
        const teacher = ref(null)
        const students = ref([]) // array of objects
        const topic = ref('')

        const statusMsg = ref(null)
        const errorMsg = ref(null)
        // Add exercise

        // Delete exercise

        // Listens for chaging of workout type input

        // Create workout
        // onSubmit => new Date()
        return { teacher, students, topic, statusMsg, errorMsg }
    },
}
</script>
