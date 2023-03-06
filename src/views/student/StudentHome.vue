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
      <StudentStats :id='userLocal.human'/>
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
import { onMounted, ref } from "vue";
import StudentStats from '../../components/StudentStats.vue';
import ThisWeek from '../../components/ThisWeek.vue';
import { getHuman } from "../../services/humanService";
import { useUserStore } from "../../store/user";

export default {
  name: "charts",
  components: {
    StudentStats,
    ThisWeek
  },
  setup() {
    // Variables
    const errorMsg = ref(null);
    const userStore = useUserStore()
    const userLocal = JSON.parse(localStorage.getItem("BJJFocusUser"))
    const humanName = ref(null)

    // Get human name and ID and set to Store @../../store/user
    async function getHumanNameAndId() {
        const res = await getHuman(userLocal.human)
        humanName.value = res.name.first
        userStore.setHumanName(res.name)
    }

    // Checks for human data in persisted state store (localstorage)
    function checkHumanName() {
      if(userStore.human.name === "") {
        getHumanNameAndId()
      }
      humanName.value = userStore.human.name.first
    }

    // Forces re-render
    function loadBottomNav(){
      let refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken !== '1') {
        location.reload()
        localStorage.setItem('refreshToken', '1')
      }
    }

    onMounted(() => {
      checkHumanName()
      loadBottomNav()
      userStore.setUserDataAndHumanID(userLocal)
    })
    
    return {
        errorMsg, userLocal,
        humanName
    };
  },
};
</script>
