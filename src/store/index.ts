import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
  },
  mutations: {
    setUsername(state, newUsername: string) {
      state.username = newUsername;
    },
  },
  actions: {},
  modules: {},
});
