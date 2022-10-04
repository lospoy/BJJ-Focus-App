<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- NewTechnique -->
    <form
      @submit.prevent="newTechnique"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-orange mb-4 self-center">New Technique</h1>

      <div class="flex flex-col mb-2">
        <label for="position" class="mb-1 text-sm text-at-light-orange"
          >position</label
        >
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="position"
          v-model="position"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="move" class="mb-1 text-sm text-at-light-orange"
          >Move</label
        >
        <select
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="move"
          v-model="move"
        >
        <option value="pass">Pass</option>
        <option value="entry">Guard</option>
        <option value="escape">Escape</option>
        <option value="submission">Submission</option>
        <option value="sweep">Sweep</option>
        <option value="takedown">Takedown</option>
        </select>
      </div>

      <div class="flex flex-col mb-2">
        <label for="variation" class="mb-1 text-sm text-at-light-orange"
          >Variation</label
        >
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="variation"
          v-model="variation"
        />
      </div>

      <Button :title='buttonTitle' :color='buttonColor' />
    </form>
  </div>
</template>nt

<script>
import { ref } from "vue";
import { createTechnique, getAllTechniques } from "../services/humanService";

// components import
import Button from "../components/Button.vue";

export default {
  name: "technique",
  components: {
    Button,
  },
  setup() {
    // Variables
    const errorMsg = ref(null);
    const position = ref(null);
    const move = ref(null);
    const variation = ref(null);

    // Move variables
    const pass = ref(null)
    const entry = ref(null)
    const escape = ref(null)
    const submission = ref(null)
    const sweep = ref(null)
    const takedown = ref(null)

    // Button success visual feedback
    let buttonColor = ref(null) 
    let buttonTitle = ref("Save New Technique")

    const buttonSuccess = async () => {
        buttonTitle.value = "Saving Technique..."
        buttonColor.value = "orange"
        setTimeout(() => {
            buttonTitle.value = "Technique Saved"
            buttonColor.value = "#33872a"
        }, 600);
        setTimeout(() => {
            buttonTitle.value = "Save New Technique"
            buttonColor.value = ""
        }, 2200);
    }

    // New Technique function
    const newTechnique = async () => {
        const allTechniques = await getAllTechniques()
        // Check if human already exists
        const foundTechnique = allTechniques.filter(human =>
            human.name.first.toLowerCase() === position.value.toLowerCase())[0]
            && allTechnique.filter(human =>
            human.name.last.toLowerCase() === move.value.toLowerCase())[0];

        if (!foundTechnique) {
            try {
              const res = await createTechnique({
                name: {
                    first: position.value,
                    last: move.value,
                },});
                // Success button visual feedback
                if(res.status === 201) { await buttonSuccess() }
            } catch (error) {
              errorMsg.value = error.message;
                setTimeout(() => {
                  errorMsg.value = null;
                }, 5000);
            }
            return;
      }
      errorMsg.value = "Error: human with that exact name already exists in the database";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    };

    return { position, move, variation, errorMsg, newTechnique, buttonColor, buttonTitle, buttonSuccess };
  },
};
</script>
