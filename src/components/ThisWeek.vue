<template>
    <div class="flex flex-col bg-light-grey rounded-md shadow-lg mb-4">
      <!-- content -->
      <div class="self-center flex flex-col p-2">
        <h2 class="self-center text-xl text-dark-grey -mb-1 uppercase">This week:</h2>
        <h1 class="self-center text-3xl mb-3 rounded-md bg-at-light-orange text-white py-1 px-16 text-center">{{ currentTopic }}</h1>
        <h2 class="self-center text-xl text-dark-grey -mb-2 uppercase">Next week:</h2>
        <h2 class="self-center text-l text-dark-grey uppercase">{{ nextTopic }}</h2>
      </div>
    </div>
</template>

<script>
import { ref } from "vue"

export default {
  name: "ThisWeek",
  setup() {
    const currentTopic = ref(null);
    const nextTopic = ref(null)

    // **************  CURRENT & NEXT TOPIC **************
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
        const startDate = new Date("September 12, 2022 00:00:00")
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

    return {
      currentTopic, nextTopic
    };
  }
};
</script>
