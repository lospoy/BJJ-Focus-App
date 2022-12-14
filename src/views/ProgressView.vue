<template>
  <div class="max-w-screen-sm mx-auto px-4 py-5">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Hi, user! -->
    <div class="px-5 py-2">
        <span class="flex text-xl text-white -mb-1">Hi, {{ humanName }}!</span>
    </div>

    <!-- THIS WEEK, NEXT WEEK -->
    <div class="flex flex-col bg-light-grey rounded-md shadow-lg mb-4">
      <!-- content -->
      <div class="self-center flex flex-col p-2">
        <h2 class="self-center text-xl text-dark-grey -mb-1 uppercase">This week:</h2>
        <h1 class="self-center text-3xl mb-3 rounded-md bg-at-light-orange text-white py-1 px-16 text-center">{{ currentTopic }}</h1>
        <h2 class="self-center text-xl text-dark-grey -mb-2 uppercase">Next week:</h2>
        <h2 class="self-center text-l text-dark-grey uppercase">{{ nextTopic }}</h2>
      </div>
    </div>

    <!-- CALENDAR (components) -->
    <SessionCalendar />

    <!-- STATS (components) -->
    <StudentStats :id='user.human' v-if="user"/>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getHuman } from "../services/humanService"
import SessionCalendar from "../components/SessionCalendar.vue"
import StudentStats from "../components/StudentStats.vue"

export default {
  name: "progressView",
  components: {
    SessionCalendar,
    StudentStats
  },
  setup() {
    // Variables
    const errorMsg = ref(null);
    const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const currentTopic = ref(null);
    const nextTopic = ref(null)
    const humanName = ref(null)

    // **************  CURRENT & NEXT TOPIC **************
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


    const getHumanNameAndId = async () => {
        const res = await getHuman(user.human)
        humanName.value = res.name.first
    }

    onMounted(() => {
      getHumanNameAndId()
    })
    
    return {
        errorMsg,
        // SESSION CALENDAR
        weeklyTopicList, currentTopic, nextTopic, currentWeekNumber,
        // STATS
        humanName, user
    };
  },
};
</script>
