<template>
    <div class="flex flex-col">
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
                </div>

                <Button title="Search" />
</template>

<script>
import { ref } from 'vue'

export default {
  name: "StudentSearch",
  setup() {
    // Initialize empty array of human ids
    const students = ref([])

    const studentSearch = async () => {
        try {
            await getStudent({
                
            })
        } catch (error) {
            
        }
    }

    return { students, studentSearch }
  }
};
</script>
