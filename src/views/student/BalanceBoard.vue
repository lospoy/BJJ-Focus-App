<template>
  <div class="max-w-screen-sm mx-auto py-5 px-1">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- TEXT ABOVE CHART  -->
    <div class="p-5 bg-light-grey rounded-md flex flex-col justify-center mb-2">
      <div class="flex flex-col pl-4 px-6 w-full">
            <ul class="list-inside space-y-1 self-center" >
              <li class="text-2xl text-dark-grey uppercase text-center">A BALANCED GAME</li>
            </ul>
            <div class="flex flex-col mt-2 w-full">
              <ul id="techniqueList" class="space-y-1 ml-4">
                  <li class="text-dark-grey px-2">
                    Tu date cuenta que cuando trabajas en cosas por igual pues no vas a ser un matao en nada
                  </li>
              </ul>
            </div>
      </div>
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
