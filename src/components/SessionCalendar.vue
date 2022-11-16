<template>
    <!-- CALENDAR -->
    <div class="p-5 bg-light-grey rounded-md shadow-lg flex flex-col mb-4 justify-center">
      <div class="rounded-md bg-at-light-orange mb-2 self-center">
        <span class="flex text-m text-white px-20">Sessions</span>
      </div>
      <div class="">
      <!-- Skeleton loader (no data) -->
      <v-calendar
        class="animate-pulse"
        is-expanded
        v-if="skeleton"
      />
      <!-- Actual calendar with data -->
      <v-calendar
        is-expanded
        :attributes="attributes"
        @dayclick = 'dayClicked'
        v-if="calendar"
      >

      </v-calendar>

      </div>
    </div>
</template>

<script>
import { ref } from "vue";
import store from "../store/store"
import { getAllFocusLessons } from "../services/bjj_services/focusLessonService"

export default {
  name: "SessionCalendar",
  setup() {
    // Variables
    const errorMsg = ref(null);
    const skeleton = ref(null)  // v-if
    const calendar = ref(null) // v-if
    const delay = 3000  // ms delay to sync the skeletonService and displayStudentData setTimeouts
    const selectedDay = ref(null)
    const dayDescription = ref(null)
    
    const skeletonService = _ => {
      skeleton.value = true
      calendar.value = false

      setTimeout(() => {
        skeleton.value = false
        calendar.value = true
      }, delay);
    }
    skeletonService()

    // **************  CALENDAR ************** 
    const date = ref(null)
    const attributes = ref(null)

    setTimeout(() => {
      
      const training = store.methods.getStudent().training
      const unattendedSessions = training.unattendedSessions
      const attendedSessions = training.attendedSessions
      const unattendedSessionsDates = unattendedSessions.map(session => session.when.date)
      const attendedSessionsDates = attendedSessions.map(session => session.when.date)
      
      // GET FOCUS LESSON TOPIC NAME (string)
      const getTopic = async(topicId) => {
        const allFocusLessons = await getAllFocusLessons()
        return await allFocusLessons.filter(_id => JSON.stringify(_id).includes(topicId))[0].topic
      }

      // Returns array of promises (attended sessions)
      const attendedPromise = attendedSessions.map(async aS => ({
        highlight: {
          style: {
            backgroundColor: '#E7C93B',
            borderColor: '#E7C93B'
          },
          fillMode: 'outline'
        },
        popover: {
          label: `${await getTopic(aS.what.focus._id)}`,
        },
        dates: aS.when.date
      }))

      // Returns array of promises (unattended sessions)
      const unattendedPromise = unattendedSessions.map(async uS => ({
        highlight: {
          style: {
            backgroundColor: 'rgba(231, 201, 59, .3)',
            borderColor: 'rgba(231, 201, 59, 0)'
          },
          fillMode: 'outline'
        },
        popover: {
          label: `${await getTopic(uS.what.focus._id)}`,
        },
        dates: uS.when.date
      }))

      const todayMarker = [{ // Style for a marker that marks today's date
          key: 'today',
          dot: 'yellow',
          dates: new Date(),
        }]

      // Returns resolved array of promises
      const resolvePromiseArrays = async(arr1, arr2) => {
        const res1 = await Promise.all(arr1)
        const res2 = await Promise.all(arr2)
        attributes.value = res1.concat(res2).concat(todayMarker)
      }
      resolvePromiseArrays(attendedPromise, unattendedPromise)
    }, delay);

    const dayClicked = day => {
      selectedDay.value = day
      console.log(selectedDay._rawValue.id)
    }

    return {
        errorMsg, date, attributes,
        skeleton, calendar,
        dayClicked, selectedDay,
        dayDescription
    };
  },
};
</script>
