<template>
    <!-- CALENDAR -->
    <div class="p-5 bg-light-grey rounded-md shadow-lg flex flex-col mb-4 justify-center">
      <div class="rounded-md bg-at-light-orange mb-2 self-center">
        <span class="flex text-m text-white px-20">Sessions</span>
      </div>
      <div class="">
      <v-calendar
        is-expanded
        :attributes="calendarAttrs"
      />
      </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { getAllSessions } from "../services/sessionService"
import store from "../store/store"


export default {
  name: "SessionCalendar",
  setup() {
    // Variables
    const errorMsg = ref(null);
    const user = JSON.parse(store.methods.getUser());
    const firstSession = ref(null)
    const latestSession = ref(null)
    const hoursTrained = ref(null)
    const totalTrained = ref(null)

    //  **************  USER'S TRAINING DATA ************** 
    //
    const getTrainingData = async() => {
        const allSessions = await getAllSessions()

        const sessionsAttendedByUser = allSessions.filter(session => JSON.stringify(session.who.students).includes(user.human))
        hoursTrained.value = sessionsAttendedByUser.length

        const firstSessionAttendedByUser = sessionsAttendedByUser[0]
        firstSession.value = new Date(firstSessionAttendedByUser.when.date)

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


    // **************  CALENDAR ************** 
    const date = ref(null)
    const calendarAttrs = [  // Attributes are supplied as an array
      {
        key: 'today',
        highlight: true,
        dates: new Date(),
      },
      {
        highlight: {
          color: 'gray',
          fillMode: 'outline'
        },
        dates: firstSession.value,
      },
    ]

    return {
        errorMsg, firstSession, latestSession, hoursTrained, totalTrained, date, calendarAttrs
    };
  },
};
</script>
