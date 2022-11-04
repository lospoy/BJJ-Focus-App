<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- TOP SQUARE -->
    <div class="flex flex-col bg-light-grey rounded-md shadow-lg mb-8">
      <!-- HEADER AND TOPICS -->
      <div class="self-center flex flex-col p-5">
        <h2 class="self-center text-2xl text-dark-grey -mb-1">This week:</h2>
        <h1 class="self-center text-5xl mb-3 rounded-md bg-at-light-orange text-white py-1.5 px-20 text-white">{{ currentTopic }}</h1>
        <h2 class="self-center text-2xl text-dark-grey -mb-2">Next week:</h2>
        <h2 class="self-center text-2xl text-dark-grey">{{ nextTopic }}</h2>
      </div>
    </div>

    <!-- BOTTOM SQUARE -->
    <div class="p-8 bg-light-grey rounded-md shadow-lg">
    <span class="flex text-2xl text-dark-grey -mb-2">Hi, {{ humanName }}!</span>
    <span class="flex text-xl text-dark-grey">Focus Sessions: {{ hoursTrained }}</span>
      <div class="flex flex-col p-6">
        <span class="text-2xl rounded-md bg-at-light-orange text-white py-1 px-4 mb-1">My Stats</span>
            <ul class="list-inside space-y-1">
                <li class="text-xl text-dark-grey">Focus Training: {{ totalTrained }}</li>
                <li class="text-xl text-dark-grey">First Session: {{ firstSession }}</li>
                <li class="text-xl text-dark-grey">Latest Session: {{ lastSession }}</li>
            </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { getHuman } from "../services/humanService"
import { getAllSessions } from "../services/sessionService"
import store from "../store/store"

export default {
  name: "progressView",
  setup() {

    // Variables
    const errorMsg = ref(null);
    const currentTopic = ref(null);
    const nextTopic = ref(null)
    const humanName = ref(null)
    const user = JSON.parse(store.methods.getUser())
    const hoursTrained = ref(null)
    const totalTrained = ref(null)
    const firstSession = ref(null)
    const lastSession = ref(null)

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

    // FUNCTION
    //
    // Gets the week number we are currently on since the startDate
    const currentWeekNumber = _ => {
         // Day the classes started
        const startDate = new Date("September 12, 2022 18:00:00")
        // Today's date
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


    //  **************  TRAINING DATA ************** 
    //
    const getTrainingData = async() => {
        const allSessions = await getAllSessions()
        // GETS HOURS TRAINED BY USER
        // Sessions are 1 hour by default, so 1 session = 1 hour of training
        const sessionsAttendedByUser = allSessions.filter(session => JSON.stringify(session.who.students).includes(user.human))
        hoursTrained.value = sessionsAttendedByUser.length
        
        // GETS FIRST SESSION ATTENDED BY USER
        const firstSessionAttendedByUser = sessionsAttendedByUser[0]
        firstSession.value = new Date(firstSessionAttendedByUser.when.date).toLocaleDateString()

        // GETS FIRST SESSION ATTENDED BY USER
        const lastSessionAttendedByUser = sessionsAttendedByUser[sessionsAttendedByUser.length-1]
        lastSession.value = new Date(lastSessionAttendedByUser.when.date).toLocaleDateString()

        // GETS TOTAL MONTHS SINCE FIRST SESSION
        const totalTrainedByUser = new Date() - new Date(firstSessionAttendedByUser.when.date)  // in miliseconds
        // const diffInWeeks = totalTrainedByUser / (1000 * 60 * 60 * 24 ) / 7
        const diffInWeeks = 6
        if (diffInWeeks < 1) {
            totalTrained.value = "Just Started!💪"
        } else if (diffInWeeks >= 1 && diffInWeeks < 8) {
            totalTrained.value = `${Math.floor(diffInWeeks)} weeks🔥`
        } else if (diffInWeeks >= 8 && diffInWeeks < 52) {
            totalTrained.value = `${Math.floor(diffInWeeks/4)} months⚡`
        } else {
            totalTrained.value = `${(diffInWeeks/4/12).toFixed(2)} years⚡`
        }
        // 

    }
    getTrainingData()


    return {
        errorMsg, weeklyTopicList, currentTopic, nextTopic, currentWeekNumber, humanName,
        hoursTrained, totalTrained, firstSession, lastSession
    };
  },
};
</script>
