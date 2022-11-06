<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Hi, user! -->
    <div class="p-5 rounded-md shadow-lg">
        <span class="flex text-2xl text-white -mb-2">Hi, {{ humanName }}!</span>
        <span class="flex text-xl text-white">Focus Sessions: {{ hoursTrained }}</span>
    </div>

    <!-- HEADER AND TOPICS -->
    <div class="flex flex-col bg-light-grey rounded-md shadow-lg mb-8">
      <!-- content -->
      <div class="self-center flex flex-col p-5">
        <h2 class="self-center text-2xl text-dark-grey -mb-1">This week:</h2>
        <h1 class="self-center text-5xl mb-3 rounded-md bg-at-light-orange text-white py-1.5 px-20 text-white">{{ currentTopic }}</h1>
        <h2 class="self-center text-2xl text-dark-grey -mb-2">Next week:</h2>
        <h2 class="self-center text-2xl text-dark-grey">{{ nextTopic }}</h2>
      </div>
    </div>

    <!-- MY STATS -->
    <div class="p-5 bg-light-grey rounded-md shadow-lg flex justify-center">
      <div class="rounded-md bg-at-light-orange">
        <span class="flex text-xl text-white px-4 py-2 justify-center">My<br>Stats</span>
      </div>
      <div class="py-2 pl-4">
            <ul class="list-inside space-y-1 justify-center">
                <li class="text-xl text-dark-grey">Latest Session: {{ latestSession }}</li>
                <li class="text-xl text-dark-grey">First Session: {{ firstSession }}</li>
                <li class="text-xl text-dark-grey">Focus Training: {{ totalTrained }}</li>
                
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
    const latestSession = ref(null)

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
        const startDate = new Date("September 12, 2022 18:00:00")
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


    //  **************  MY STATS ************** 
    //
    const getTrainingData = async() => {
        const allSessions = await getAllSessions()

        const sessionsAttendedByUser = allSessions.filter(session => JSON.stringify(session.who.students).includes(user.human))
        hoursTrained.value = sessionsAttendedByUser.length
        
        const firstSessionAttendedByUser = sessionsAttendedByUser[0]
        firstSession.value = new Date(firstSessionAttendedByUser.when.date).toLocaleDateString()

        const latestSessionAttendedByUser = sessionsAttendedByUser[sessionsAttendedByUser.length-1]
        const diffInDays = new Date(latestSessionAttendedByUser.when.date) - new Date(firstSessionAttendedByUser.when.date) // in miliseconds
        latestSession.value = `${Math.floor(diffInDays / (1000 * 60 * 60 * 24 ))} days ago`

        const totalTrainedByUser = new Date() - new Date(firstSessionAttendedByUser.when.date)  // in miliseconds
        const diffInWeeks = totalTrainedByUser / (1000 * 60 * 60 * 24 ) / 7
        if (diffInWeeks < 1) {
            totalTrained.value = "Just Started!💪"
        } else if (diffInWeeks >= 1 && diffInWeeks < 8) {
            totalTrained.value = `${Math.floor(diffInWeeks)} weeks🔥`
        } else if (diffInWeeks >= 8 && diffInWeeks < 52) {
            totalTrained.value = `${Math.floor(diffInWeeks/4)} months⚡`
        } else {
            totalTrained.value = `${(diffInWeeks/4/12).toFixed(2)} years⚡`
        }
    }
    getTrainingData()


    return {
        errorMsg, weeklyTopicList, currentTopic, nextTopic, currentWeekNumber, humanName,
        hoursTrained, totalTrained, firstSession, latestSession
    };
  },
};
</script>
