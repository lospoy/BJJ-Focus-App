<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- CALENDLY -->
    <div class="flex bg-light-grey h-fit rounded-md shadow-lg justify-center">
        <!-- Calendly inline widget begin -->
        <div
            class="flex justify-center calendly-inline-widget"
            data-url="https://calendly.com/lospoy/private-class?&hide_gdpr_banner=1&background_color=f7f7f7&text_color=3d4250&primary_color=d85a3b"
            style="display:flex;height:55vh;min-width:97%;align-items: stretch;"
            >
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
  name: "privateClass",
  setup() {

    // Calendly
    const recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js')
    document.head.appendChild(recaptchaScript)

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
