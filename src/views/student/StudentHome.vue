<template>
  <div class="max-w-screen-sm mx-auto py-5 px-1 mt-20">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <div class="flex flex-col rounded-md -space-y-3">
      <div class="flex flex-col w-full pl-7 py-10">
        <h3 class="text-base text-med-grey2">Hi, {{ humanName }}!</h3>
      </div>
      <StudentStats :id='user.human'/>
      <ThisWeek />
    </div>

    <!-- BETA NOTE -->
    <div class="flex flex-col pl-7 px-10 w-full mt-28">
      <div class="flex flex-col mt-2 w-full">
        <ul class="space-y-1 self-center">
            <li class="text-med-grey2 text-xs font-normal">
              This is a closed beta - some things might be slow (or broken). Please share your feedback! Thanks and see you in class.
            </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getHuman } from "../../services/humanService"
import { setTrainingData } from "../../helpers/trainingData"
import StudentStats from '../../components/StudentStats.vue';
import ThisWeek from '../../components/ThisWeek.vue';

export default {
  name: "charts",
  components: {
    StudentStats,
    ThisWeek
  },
  setup() {
    // Variables
    const errorMsg = ref(null);
    const user = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const humanName = ref(null)

    const getHumanNameAndId = async () => {
        const res = await getHuman(user.human)
        humanName.value = res.name.first
    }

    const processTrainingData = async(id) => {
      await setTrainingData(id)
    }

    function loadBottomNav(){
      let refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken !== '1') {
        location.reload()
        localStorage.setItem('refreshToken', '1')
      }
    }

    onMounted(() => {
      getHumanNameAndId()
      processTrainingData(user.human)
      loadBottomNav()
    })
    
    return {
        errorMsg, user,
        humanName
    };
  },
};
</script>
