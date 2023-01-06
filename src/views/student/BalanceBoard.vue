<template>
  <div class="max-w-screen-sm mx-auto px-4 py-5">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <TopicsChart :id='user.human'/>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { setTrainingData } from "../../helpers/trainingData"
import TopicsChart from '../../components/TopicsChart.vue';

export default {
  name: "progressView",
  components: {
    TopicsChart,
  },
  setup() {
    // Variables
    const errorMsg = ref(null);
    const user = JSON.parse(localStorage.getItem("BJJFocusUser"))

    const processTrainingData = async(id) => {
      await setTrainingData(id)
    }

    onMounted(() => {
      processTrainingData(user.human)
    })
    
    return {
        errorMsg, user
    };
  },
};
</script>
