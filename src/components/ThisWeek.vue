<template>
    <div class="flex flex-col bg-dark-grey mb-4 p-3 mt-2">
      <!-- content -->
      <div class="flex flex-col px-4">
        <h2 class="text-sm -mb-2 mt-2 text-med-grey2">This week's topic is</h2>
        <h1 class="text-4xl text-white uppercase">{{ currentTopic }}</h1>


        <!-- <h2 class="self-center text-xl text-light-grey -mb-2 uppercase">Next week:</h2>
        <h2 class="self-center text-l text-light-grey uppercase">{{ nextTopic }}</h2> -->
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
