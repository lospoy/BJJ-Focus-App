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

// components import

export default {
  name: "progressView",
  setup() {
    // Variables
    const errorMsg = ref(null);
    const currentTopic = ref(null);
    const nextTopic = ref(null)

    // One topic per week
    const weeklyTopicList = [
        "Back Control",     // semana 1
        "Half Guard",       // semana 2
        "Side Control",     // semana 3
        "Closed Guard",     // ...
        "Mount",
        "De la Riva",
        "Open Guard & North-South", // estamos aqui semana 7
        "Turtle and Takedowns"  
    ]

    // Cambiar el 6 por una variable
    // Cambio basado en Date() o algo asi
    // Al final del array, vuelve al principio

    // Sistema tiene que ser consciente del dia actual
    // Evento al cambio de fecha -> checkeo una vez, si el dia es X -> cambio
    // Hay que almacenar el numero de la semana de lo que llevamos de curso

    // Crear cuentaSemana en base de datos
    // Cada vez que pasa una semana cuentaSemana+1
    // get cuentaSemana y pasarlo en la funcion de abajo

    // Set a start date
    // count how many weeks from start date
    // pass in variable below

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
