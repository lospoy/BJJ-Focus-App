<template>
  <div class="max-w-screen-sm mx-auto px-4 py-5">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- STATS (components) -->
    <StudentStats :title='studentTitle'/>
  </div>
</template>

<script>
import { ref } from "vue";
import { getHuman } from "../services/humanService"
import store from "../store/store"
import StudentStats from "../components/StudentStats.vue"
import { setTrainingData } from "../store/trainingData"

export default {
  name: "student",
  components: {
    StudentStats
  },
  setup() {
    // Variables
    const errorMsg = ref(null);
    let studentTitle = ref("Student Stats")
    
    return {
        errorMsg,
        studentTitle
    };
  },
};
</script>
