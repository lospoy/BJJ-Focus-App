<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- PROFILE -->
    <div
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-4xl text-at-light-orange mb-1 self-center">{{ currentTopic }}</h1>
      <h2 class="text-sm text-at-light-orange mb-1 self-center">Next Topic: {{ nextTopic }}</h2>

    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "progressView",
  setup() {

    // Variables
    const errorMsg = ref(null);
    const currentTopic = ref(null);
    const nextTopic = ref(null)

    // One topic per week
    const weeklyTopicList = [
        "Back Control",
        "Half Guard",
        "Side Control",
        "Closed Guard",
        "Mount",
        "De la Riva",
        "Open Guard & North-South",
        "Turtle and Takedowns"  
    ]

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

    const currentTopicArrayIndex = Math.floor(currentWeekNumber() % 8)
    const nextTopicArrayIndex = Math.floor(((currentWeekNumber() +1) % 8))

    currentTopic.value = weeklyTopicList[currentTopicArrayIndex]
    nextTopic.value = weeklyTopicList[nextTopicArrayIndex]

    return { errorMsg, weeklyTopicList, currentTopic, nextTopic, currentWeekNumber };
  },
};
</script>
