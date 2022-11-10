<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Hi, user! -->
    <div class="p-5">
        <span class="flex text-2xl text-white -mb-2">Hi, {{ humanName }}!</span>
        <span class="flex text-xl text-white">Focus Sessions: {{ focusSessions }}</span>
    </div>

    <!-- THIS WEEK, NEXT WEEK -->
    <div class="flex flex-col bg-light-grey rounded-md shadow-lg mb-4">
      <!-- content -->
      <div class="self-center flex flex-col p-5">
        <h2 class="self-center text-2xl text-dark-grey -mb-1 uppercase">This week:</h2>
        <h1 class="self-center text-5xl mb-3 rounded-md bg-at-light-orange text-white py-1.5 px-20">{{ currentTopic }}</h1>
        <h2 class="self-center text-xl text-dark-grey -mb-2 uppercase">Next week:</h2>
        <h2 class="self-center text-l text-dark-grey uppercase">{{ nextTopic }}</h2>
      </div>
    </div>

    <!-- CALENDAR (components) -->
    <!-- <SessionCalendar /> -->

    <!-- STATS (components) -->
    <StudentStats />
    
  </div>
</template>

<script>
import { ref } from "vue";
import { getHuman } from "../services/humanService"
import store from "../store/store"
import SessionCalendar from "../components/SessionCalendar.vue"
import StudentStats from "../components/StudentStats.vue"
import { setTrainingData } from "../store/trainingData"

export default {
  name: "progressView",
  components: {
    SessionCalendar,
    StudentStats
  },
  setup() {
    const processTrainingData = async() => {
      await setTrainingData()
    }
    processTrainingData()

    // Variables
    const errorMsg = ref(null);
    const user = store.methods.getUser()

    const currentTopic = ref(null);
    const nextTopic = ref(null)
    const humanName = ref(null)
    const focusSessions = ref(null)

    const displayFocusSessions = async() => {
      focusSessions.value = "..."

      setTimeout(() => {
        focusSessions.value = store.methods.getStudent().training.focusSessions
      }, 2300);
    }
    displayFocusSessions()

    const getHumanName = async () => {
        const res = await getHuman(user.human)
        humanName.value = res.name.first
    }
    getHumanName()

    // **************  CURRENT & NEXT TOPIC **************  
    //
    // DATA
    // One topic per week
    const weeklyTopicList = [
        "Back Control",
        "Half Guard",
        "Side Control",
        "Closed Guard",
        "Mount",
        "De la Riva",
        "Open Guard",
        "Turtle"  
    ]

    // Gets the week number we are currently on since the startDate
    const currentWeekNumber = _ => {
         // Day the classes started
        const startDate = new Date("September 12, 2022 00:00:00")
        const endDate = new Date()
        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInWeeks = diffInMs / (1000 * 60 * 60 * 24 ) / 7;

        return diffInWeeks
    }

    // Using modulus to "loop back" to index 0 after reaching last index
    const currentTopicArrayIndex = Math.floor(currentWeekNumber() % 8)
    const nextTopicArrayIndex = Math.floor(((currentWeekNumber() +1) % 8))
    // Assigning values to variables
    currentTopic.value = weeklyTopicList[currentTopicArrayIndex]
    nextTopic.value = weeklyTopicList[nextTopicArrayIndex]
    // 
    // END OF CURRENT & NEXT TOPIC
    
    return {
        errorMsg,
        weeklyTopicList, currentTopic, nextTopic, currentWeekNumber, humanName,
        focusSessions
    };
  },
};
</script>
