<template>
    <!-- CALENDAR -->
    <div class="p-5 bg-light-grey rounded-md shadow-lg flex flex-col mb-4 justify-center">
      <div class="rounded-md bg-at-light-orange mb-2 self-center">
        <span class="flex text-m text-white px-20">Sessions</span>
      </div>
      <div class="">
      <v-calendar
        class="animate-pulse"
        is-expanded
        v-if="skeleton"
      />
      <v-calendar
        is-expanded
        :attributes="calendarAttrs"
        v-if="calendar"
      />
      </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import store from "../store/store"

export default {
  name: "SessionCalendar",
  setup() {
    // Variables
    const errorMsg = ref(null);
    const skeleton = ref(null)  // v-if
    const calendar = ref(null) // v-if
    const delay = 3000  // ms delay to sync the skeletonService and displayStudentData setTimeouts
    
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
    const calendarAttrs = ref(null)

    setTimeout(() => {
      const training = store.methods.getStudent().training
      const unattendedSessions = training.unattendedSessions.map(session => session.when.date)
      const attendedSessions = training.attendedSessions.map(session => session.when.date)

      calendarAttrs.value = [  // Attributes are supplied as an array
        { // today
          key: 'today',
          dot: 'yellow',
          dates: new Date(),
        },
        { // sessions held but unnattended by user
          highlight: {
            style: {
              backgroundColor: 'rgba(231, 201, 59, .3)',
              borderColor : 'rgba(231, 201, 59, 0)'
            },
            fillMode: 'outline'
          },
          dates: unattendedSessions,
        },
        { // sessions attended by user
          highlight: {
            style: {
              backgroundColor: '#E7C93B',
              borderColor : '#E7C93B'
            },
            fillMode: 'outline'
          },
          dates: attendedSessions,
        },
      ]

      console.log(unattendedSessions)
    }, delay);

    return {
        errorMsg, date, calendarAttrs,
        skeleton, calendar
    };
  },
};
</script>
