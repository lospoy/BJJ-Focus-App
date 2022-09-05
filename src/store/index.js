import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

import { newUser } from '../views/Register.vue'

//load Vuex
Vue.use(Vuex);

//to handle state
const state = {
    user: {}
}

//to handle state
const getters = {
    
}

//to handle actions
const actions = {
    getPosts({ commit }) {
        axios.get('https://localhost:8000/api/users')
            .then(response => {
            commit('SET_POSTS', response.data)
        })
    },
    registerUser({ commit }) {
        axios.post('https://localhost:8000/api/users')
            .then(req => {
            commit('NEW_USER', req.data)
        })
    },

}

//to handle mutations
const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts
    },
    NEW_USER(state, data) {
        state.data = data
    },
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})