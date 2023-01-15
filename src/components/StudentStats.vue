<template>
    <!-- MY STATS -->
    <div class="p-5 bg-dark-grey flex flex-col justify-center">
      <div class="pl-4 px-6 animate-pulse" v-if="skeleton">
            <ul class="list-inside justify-center">
                <li class="text-xs text-light-grey">You've attended {{ focusSessions }} Focus sessions.</li>
                <li class="text-xs text-light-grey">Your most recent session was {{ latestSession }}.</li>
                <li class="text-xs text-light-grey">Your first session was on {{ firstSession }}.</li>
                <li class="text-xs text-light-grey">You've been doing Focus training for {{ totalTrained }}</li>
            </ul>
      </div>
      <div class="pl-4 px-6" v-if="stats">
            <ul class="list-inside justify-center">
                <li class="text-xs text-light-grey">You've attended {{ focusSessions }} Focus sessions.</li>
                <li class="text-xs text-light-grey">Your most recent session was {{ latestSession }}.</li>
                <li class="text-xs text-light-grey">Your first session was on {{ firstSession }}.</li>
                <li class="text-xs text-light-grey">You've been doing Focus training for {{ totalTrained }}</li>
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
