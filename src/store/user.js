import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    userID: '',
    email: '',
    humanID: '',
    role: {}
  })

  function setUser(payload) {
    if(!payload) { return user.value = null }

    user.value.userID = payload._id,
    user.value.email = payload.email,
    user.value.humanID = payload.human,
    user.value.role = payload.role
  }

  return {
    user, setUser
  }
})