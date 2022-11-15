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
      <!-- Seems to be using V-Slots, not working as of now -->
      <v-calendar
        is-expanded
        :attributes="attr"
        @dayclick = 'dayClicked'
        v-if="calendar"
      >
        <template #day-popover>
          <div>
            <ul>
              <li
                v-for="{key, customData} in attr"
                :key="key">
                {{ customData.description }}
              </li>
            </ul>
          </div>
        </template>

        <div
          v-if='selectedDay'
          class='selected-day'>
          <h3>{{ selectedDay.date.toDateString() }}</h3>
          <ul>
            <li
              v-for='attr in selectedDay.attributes'
              :key='attr.key'>
              {{ attr.customData.description }}
            </li>
          </ul>
        </div>

      </v-calendar>
      </div>
    </div>
</template>

<script>
import { ref } from "vue";
import store from "../store/store"

export default {
  name: "SessionCalendar",
  setup() {
    // Variables
    const errorMsg = ref(null);
    const skeleton = ref(null)  // v-if
    const calendar = ref(null) // v-if
    const delay = 3000  // ms delay to sync the skeletonService and displayStudentData setTimeouts
    const selectedDay = ref(null)

    // Calendar data
    const todos = [
      {
        id: 1,
        description: 'Take Noah to basketball practice.',
        isComplete: false,
        dates: new Date(2022, 10, 15),
        color: 'red',
      }
    ]
    
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
    const attr = ref(null)

    setTimeout(() => {
      const training = store.methods.getStudent().training
      const unattendedSessions = training.unattendedSessions.map(session => session.when.date)
      const attendedSessions = training.attendedSessions.map(session => session.when.date)

      attr.value = [  // Attributes are supplied as an array
        // HELD AND ATTENDED SESSIONS (WORKING)
        // { // today
        //   key: 'today',
        //   dot: 'yellow',
        //   dates: new Date(),
        // },
        // { // sessions held but unnattended by user
        //   highlight: {
        //     style: {
        //       backgroundColor: 'rgba(231, 201, 59, .3)',
        //       borderColor : 'rgba(231, 201, 59, 0)'
        //     },
        //     fillMode: 'outline'
        //   },
        //   dates: unattendedSessions,
        // },
        // { // sessions attended by user
        //   highlight: {
        //     style: {
        //       backgroundColor: '#E7C93B',
        //       borderColor : '#E7C93B'
        //     },
        //     fillMode: 'outline'
        //   },
        //   dates: attendedSessions,
        // },
        // END OF HELD AND ATTENDED SESSIONS (WORKING)

        // Scoped slots for the Calendar (date on-click/hover)
        todos.map(t => ({
          key: `todo.${t.id}`,
          dates: t.dates,
          dot: {
            color: t.color,
            class: t.isComplete ? 'opacity-75' : '',
          },
          popover: {
            label: t.description,
          },
          customData: t,
        })),
      ]
    }, delay);

    const dayClicked = day => {
      selectedDay.value = day
      console.log(selectedDay.value)
    }

    return {
        errorMsg, date, attr,
        skeleton, calendar,
        todos, dayClicked, selectedDay
    };
  },
};
</script>
