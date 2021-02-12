import User from "../api/User";
import router from '../router/index';

export default {
  namespaced: true,
  state: {
    overlay: false,
    authenticated: false,
    user: null,
    loading: false
  },
  getters: {
    overlay(state) {
      return state.overlay;
    },
    authenticated(state) {
      return state.authenticated;
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    }
  },

  mutations: {
    SET_OVERLAY(state, value) {
      state.overlay = value;
    },
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    SET_LOADING(state, value) {
      state.loading = value;
    }
  },

  actions: {
    async singIn({ dispatch, commit }, credentials) {
      try {
        commit("SET_LOADING", true);
        let response = await User.login(credentials);
        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await dispatch("me");
        await commit("SET_LOADING", false);
        router.push({path: "/event/index"})
        return true;
      } catch (error) {
        commit("SET_LOADING", false);
        return false;
      }
    },

    async me({ commit }) {
      try {
        let response = await User.getUser();
        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        commit("SET_AUTHENTICATED", true);
        commit("SET_USER", response.data);
      } catch (error) {
        commit("SET_AUTHENTICATED", false);
        commit("SET_USER", null);
      }
    },
    async cerrarSesion({commit}, data){
      try {
          let response = await User.logout(data);
          if(response.status != 204){
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          commit("SET_AUTHENTICATED", false);
      } catch (error) {
          console.log(error);
      }
    },
    desautenticar({commit}){
      commit("SET_AUTHENTICATED", false);
    },
    registerUser({commit}, data){
      commit("SET_OVERLAY", true);
      return new Promise((resolve,reject) => {
        User.registerUser(
              data,
             (response) => {
              commit("SET_OVERLAY", false);
                 resolve(response);
             },
             (error) => {
              commit("SET_OVERLAY", false);
                 reject(error);
             } 
          )
      }) 
    },
    verifiPassOld({commit}, data){
      commit("SET_OVERLAY", true);
      return new Promise((resolve,reject) => {
        User.verifiPassOld(
              data,
             (response) => {
              commit("SET_OVERLAY", false);
                 resolve(response);
             },
             (error) => {
              commit("SET_OVERLAY", false);
                 reject(error);
             } 
          )
      }) 
    },
    sendEmailReset({commit}, data){
      commit("SET_OVERLAY", true);
      return new Promise((resolve,reject) => {
        User.sendEmailReset(
              data,
            (response) => {
              commit("SET_OVERLAY", false);
                resolve(response);
            },
            (error) => {
              commit("SET_OVERLAY", false);
                reject(error);
            })
      }) 
    },
    passwordReset({commit}, data){
      commit("SET_OVERLAY", true);
      return new Promise((resolve,reject) => {
        User.passwordReset(
              data,
            (response) => {
              commit("SET_OVERLAY", false);
                resolve(response);
            },
            (error) => {
              commit("SET_OVERLAY", false);
                reject(error);
            })
      }) 
    },

  }
};
