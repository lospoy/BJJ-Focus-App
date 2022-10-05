<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- NewTechnique -->
    <form
      @submit.prevent="newPosition"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-orange mb-4 self-center">
        New Technique</h1
      >

      <div class="flex flex-col mb-2">
        <label for="position" class="mb-1 text-sm text-at-light-orange"
          >Position</label
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
        <div class="flex-row">
            <input
              type="text"
              required
              class="p-2 text-gray-500 focus:outline-none w-4/6"
              id="move"
              v-model="move"
            />
            <select
              required
              class="p-2 text-gray-500 focus:outline-none w-2/6"
              id="moveCategory"
              v-model="moveCategory"
            >
            <option value="{ category: { pass: true }">Pass</option>
            <option value="{ category: { entry: true }">Guard</option>
            <option value="{ category: { escape: true }">Escape</option>
            <option value="{ category: { submission: true }">Submission</option>
            <option value="{ category: { sweep: true }">Sweep</option>
            <option value="{ category: { takedown: true }">Takedown</option>
            </select>
        </div>
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
</template>

<script>
import { ref } from "vue";
import { createTechnique, getAllTechniques } from "../services/bjj_services/techniqueService";
import { createPosition, getAllPositions } from "../services/bjj_services/positionService";
import { createMove, getAllMoves } from "../services/bjj_services/moveService";
import { createVariation, getAllVariations } from "../services/bjj_services/variationService";

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
    let positionId = ref('')
    let move = ref(null);
    let moveCategory = ref(null)
    let variation = ref(null);

    // Button success visual feedback
    let buttonColor = ref(null) 
    let buttonTitle = ref("Save Technique")

    const buttonSuccess = async () => {
        buttonTitle.value = "Saving Technique..."
        buttonColor.value = "orange"
        setTimeout(() => {
            buttonTitle.value = "Technique Saved"
            buttonColor.value = "#33872a"
        }, 600);
        setTimeout(() => {
            buttonTitle.value = "Save Technique"
            buttonColor.value = ""
        }, 2200);
    }

    // **********************************************************************************************
    //                                       POSITION
    // **********************************************************************************************
    const newPosition = async () => {
        const allPositions = await getAllPositions()
        console.log(position.value)
        const foundPosition = allPositions.filter(
            position => position.name.english.toLowerCase() === position.value.toLowerCase())

        positionId = foundPosition[0]._id // if found, assign id to global variable

        if (!foundPosition) {
            try {
              const res = await createPosition({ position: { name: { english: position.value }}});
              if(res.status === 201) { await buttonSuccess() } // Success button visual feedback
              position = res._id // assign id to global variable
            } catch (error) {
              errorMsg.value = error.message;
                setTimeout(() => {
                  errorMsg.value = null;
                }, 5000);
            }
            return;
        }
        errorMsg.value = "Error: position with that exact name already exists in the database";
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
    }

    // **********************************************************************************************
    //                                       MOVE
    // **********************************************************************************************
    const newMove = async () => {
        const allMoves = await getAllMoves()
        // Check if technique already exists
        const foundMove = allMoves.filter(
            move => move.name.english.toLowerCase() === move.value.toLowerCase())[0]
            move = foundMove._id // if found, assign id to global variable

        if (!foundMove) {
            try {
              const res = await createMove({
                move: { name: { english: move.value }},
                category: moveCategory.value
              });
              if(res.status === 201) { await buttonSuccess() } // Success button visual feedback
              move = res._id // assign id to global variable
            } catch (error) {
              errorMsg.value = error.message;
                setTimeout(() => {
                  errorMsg.value = null;
                }, 5000);
            }
            return;
        }
        errorMsg.value = "Error: move with that exact name already exists in the database";
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
    }

    // **********************************************************************************************
    //                                       VARIATION
    // **********************************************************************************************
    const newVariation = async () => {
        const allVariations = await getAllVariations()
        // Check if technique already exists
        const foundVariation = allVariations.filter(
            variation => variation.name.english.toLowerCase() === variation.value.toLowerCase())[0]
            variation = foundVariation._id // if found, assign id to global variable

        if (!foundVariation) {
            try {
              const res = await createVariation({ variation: { name: { english: variation.value }}});
              if(res.status === 201) { await buttonSuccess() } // Success button visual feedback
              variation = res._id // assign id to global variable
            } catch (error) {
              errorMsg.value = error.message;
                setTimeout(() => {
                  errorMsg.value = null;
                }, 5000);
            }
            return;
        }
        errorMsg.value = "Error: variation with that exact name already exists in the database";
            setTimeout(() => {
                errorMsg.value = null;
            }, 5000);
    }

    // creating a new technique means creating a new COMBINATION of POSITION, MOVE, and VARIATION
    // position may or may not exist
    // move may or may not exist
    // variation may or may not exist

    // if Technique found, then we get a technique id
    // if Technique not found:
    // 1. Look for position that was entered in the form:
    //      1.a. if found we get a position id
    //      1.b. if not found => createPosition() and return position id
    // 2. Look for move that was entered in the form:
    //      2.a. if found we get a position id
    //      2.b. if not found => createMove() and return move id
    // 3. Look for variation that was entered in the form:
    //      3.a. if found we get a position id
    //      3.b. if not found => createVariation() and return variation id
    // then with { position: _id, move: _id, variation: _id } => createTechnique()

    // **********************************************************************************************
    //                                       TECHNIQUE
    // **********************************************************************************************
    const newTechnique = async () => {        
        const allTechniques = await getAllTechniques()
        // Check if technique already exists
        const foundTechnique = allTechniques.filter(
            position => position.name.english.toLowerCase() === position.value.toLowerCase())[0]
            && allTechniques.filter(
            move => move.name.english.toLowerCase() === move.value.toLowerCase())[0]
            && allTechniques.filter(
            variation => variation.name.english.toLowerCase() === variation.value.toLowerCase())[0];

        if (!foundTechnique) {
            try {
              // These values should all be ids
              const res = await createTechnique({
                position: position.value,
                move: move.value,
                variation: variation.value
              });
              if(res.status === 201) { await buttonSuccess() } // Success button visual feedback
            } catch (error) {
              errorMsg.value = error.message;
                setTimeout(() => {
                  errorMsg.value = null;
                }, 5000);
            }
            return;
      }
      errorMsg.value = "Error: technique already exists in the database";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }

    return {
        position, move, moveCategory, variation,
        errorMsg, buttonColor, buttonTitle, buttonSuccess,
        newPosition, newMove, newVariation, newTechnique
    };
  },
};
</script>
