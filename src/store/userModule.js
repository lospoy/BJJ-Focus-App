import axios from 'axios';
import { stringifyQuery } from 'vue-router';

const resource_uri = "http://localhost:8000/api"

// how to get user from local storage??
// const userLocal = JSON.parse(localStorage.getItem('user'));

const state = {
    user: {}
}

const mutations = {
    REGISTER_USER: (state, payload) => {
        const newUser = {
            email: payload.email,
            password: payload.password,
            human: payload.human,
            completed: false
        }
        return newUser
    }
}

const actions = {
    async registerUser({ commit }) {
        const res = await axios.post(resource_uri + 'users')
        commit("REGISTER_USER", res.data)
    }
};

export const user = {
    namespaced: true,
    state,
    actions,
    mutations,
};