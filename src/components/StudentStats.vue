<template>
    <!-- MY STATS -->
    <div class="p-5 bg-light-grey rounded-md shadow-md flex flex-col justify-center">
      <div class="rounded-md bg-at-light-orange mb-2 self-center">
        <span class="flex text-m text-white px-20">{{ title }}</span>
      </div>
      <div class="pl-4 px-6 animate-pulse" v-if="skeleton">
            <ul class="list-inside space-y-1 justify-center">
                <li class="text-l text-dark-grey uppercase">Focus Sessions: {{ focusSessions }}</li>
                <li class="text-l text-dark-grey uppercase">Latest Session: {{ latestSession }}</li>
                <li class="text-l text-dark-grey uppercase">First Session: {{ firstSession }}</li>
                <li class="text-l text-dark-grey uppercase">Focus Training: {{ totalTrained }}</li>
            </ul>
      </div>
      <div
        class="pl-4 px-6"
        v-if="stats"
      >
            <ul
              class="list-inside space-y-1 justify-center"
            >
                <li class="text-l text-dark-grey uppercase">Focus Sessions: {{ focusSessions }}</li>
                <li class="text-l text-dark-grey uppercase">Latest Session: {{ latestSession }}</li>
                <li class="text-l text-dark-grey uppercase">First Session: {{ firstSession }}</li>
                <li class="text-l text-dark-grey uppercase">Focus Training: {{ totalTrained }}</li>
            </ul>
      </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { setTrainingData } from "../helpers/trainingData"
import store from "../store/store"

export default {
  name: "StudentStats",
  props: {
    title: {
      type: String,
      default: "Stats",
    },
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {  // passing props allows us to use the values inside the props object -> props.item
    // Variables
    const errorMsg = ref(null);
    const focusSessions = ref(null)
    const totalTrained = ref(null)
    const firstSession = ref(null)
    const latestSession = ref(null)
    const skeleton = ref(null)  // v-if
    const stats = ref(null) // v-if
    const delay = 1000  // ms delay for skeletonService

    const processTrainingData = async(id) => {
      await setTrainingData(id)
    }

    const skeletonService = _ => {
      skeleton.value = true
      stats.value = false

      setTimeout(() => {
        skeleton.value = false
        stats.value = true
      }, delay);
    }

    const displayStudentData = async() => {
      latestSession.value = '...'
      firstSession.value = '...'
      totalTrained.value = '...'
      focusSessions.value = "..."

      setTimeout(() => {  // data pulled from the store, but set @store/trainingData.js
        const training = store.methods.getStudent().training

        latestSession.value = `${training.daysSinceLatestSession} days ago`
        firstSession.value = new Date(training.firstSession).toLocaleDateString()
        focusSessions.value = store.methods.getStudent().training.focusSessions

        const weeksTrained = training.weeksTrained
        if (weeksTrained < 1) {
            totalTrained.value = "Just Started!💪"
        } else if (weeksTrained >= 1 && weeksTrained < 8) {
            totalTrained.value = `${Math.floor(weeksTrained)} weeks🔥`
        } else if (weeksTrained >= 8 && weeksTrained < 52) {
            totalTrained.value = `${Math.floor(weeksTrained/4)} months⚡`
        } else {
            totalTrained.value = `${(weeksTrained/4/12).toFixed(2)} years⚡`
        }    
      }, delay);
    }

    onMounted(() => {
      displayStudentData()
      skeletonService()
      processTrainingData(props.id)
    })

    return {
        errorMsg,
        skeleton, stats,
        totalTrained, firstSession, latestSession, focusSessions, processTrainingData
    };
  },
};
</script>
