import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const moduleMainBar = {
  state: () => ({
    isMini: false
  })
}

const moduleUser = {
  state: () => ({
    user: null,
    isUserloggedIn: false
  }),
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser ({commit}, payload) {
      commit('setUser', payload)
    }
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  modules: {
    MainBar: moduleMainBar,
    User: moduleUser
  },
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, payload) {
      commit('setUser', payload)
    }
  }
})
