import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    setUser (state, n) {
      state.user = n
    }
  },
  actions: {},
  modules: {},
});
