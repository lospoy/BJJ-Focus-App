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
import store from "../store/store"


export default {
  name: "SessionCalendar",
  setup() {
    // Variables
    const errorMsg = ref(null);

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
        errorMsg, date, calendarAttrs
    };
  },
};
</script>
