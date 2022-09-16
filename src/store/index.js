// Using Composition API

import { reactive } from 'vue'

const state = reactive({
    user: null,
})

const methods = {
    setUser(payload) {
        state.user = payload ? payload : null
    }
}

export default {
    state,
    methods,
}