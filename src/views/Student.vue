<template>
  <div class="max-w-screen-sm mx-auto px-4 py-5">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- STATS (components) -->
    <StudentStats
      :title='title'
      :human-id='humanId'
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getHuman } from "../services/humanService"
import StudentStats from "../components/StudentStats.vue"

export default {
  name: "student",
  components: {
    StudentStats
  },
  setup() {
    // Variables
    const errorMsg = ref(null);
    const title = ref(null)
    const humanId = ref('')
    const humanName = ref(null)

    const getHumanName = async(id) => {
      const human = await getHuman(id)
      title.value = human.name.first + ' ' + human.name.last
    }

    const setHumanId = id => {
      humanId.value = id
    }

    onMounted(() => {
      setHumanId('630d866e5b21aa1ce143945c')  // FOR TESTING PURPOSES
      getHumanName(humanId.value)
      console.log(humanId.value)
    })

    

    // studentTitle = human.name.first + ' ' + human.name.last
    
    return {
        errorMsg,
        title, humanId, humanName, getHumanName
    };
  },
};
</script>
