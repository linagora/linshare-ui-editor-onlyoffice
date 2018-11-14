import Vue from "vue";

const state = {
  jwtToken: localStorage.getItem("default_auth_token")
};

const types = {
  SET_JWT_TOKEN: "SET_JWT_TOKEN"
};

const actions = {
  setJWTToken({ commit }, token) {
    commit(types.SET_JWT_TOKEN, token);
  },

  logout({ dispatch }) {
    return new Promise(resolve => {
      Vue.auth.logout();
      dispatch("resetSession");
      resolve();
    });
  },

  resetSession({ dispatch }) {
    dispatch("user/resetUser", null, { root: true });
    dispatch("setJWTToken", "");
  }
};

const mutations = {
  [types.SET_JWT_TOKEN](state, token) {
    state.jwtToken = token;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
