<template>
    <!-- MY STATS -->
    <div class="p-5 bg-light-grey rounded-md shadow-lg flex flex-col justify-center">
      <div class="rounded-md bg-at-light-orange mb-2 self-center">
        <span class="flex text-m text-white px-24">Stats</span>
      </div>
      <div class="pl-4 px-6">
            <ul class="list-inside space-y-1 justify-center">
                <li class="text-l text-dark-grey uppercase">Latest Session: {{ latestSession }}</li>
                <li class="text-l text-dark-grey uppercase">First Session: {{ firstSession }}</li>
                <li class="text-l text-dark-grey uppercase">Focus Training: {{ totalTrained }}</li>
            </ul>
      </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { getAllSessions } from "../services/sessionService"
import store from "../store/store"

export default {
  name: "StudentStats",
  setup() {
    // Variables
    const errorMsg = ref(null);
    const user = JSON.parse(store.methods.getUser());
    const focusSessions = ref(null)
    const totalTrained = ref(null)
    const firstSession = ref(null)
    const latestSession = ref(null)

    //  **************  USER'S TRAINING DATA ************** 
    //
    const getTrainingData = async() => {
        const allSessions = await getAllSessions()

        const sessionsAttendedByUser = allSessions.filter(session => JSON.stringify(session.who.students).includes(user.human))
        focusSessions.value = sessionsAttendedByUser.length

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

        store.methods.setStudent({
          focusSessions: focusSessions.value,
          firstSession: firstSession.value,
          latestSession: latestSessionAttendedByUser.when.date,
          weeksTrained: diffInWeeks
        })
    }
    getTrainingData()

    return {
        errorMsg,
        focusSessions, totalTrained, firstSession, latestSession,
    };
  },
};
</script>
