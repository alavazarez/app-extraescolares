import User from "../api/User";
export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: null,
    loading: false
  },
  getters: {
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
        dispatch("me");
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_LOADING", false);
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
    async cerrarSesion({commit}){
      try {
          let response = await User.logout();
          if(response.status != 200){
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          //commit("SET_AUTHENTICATED", false);
      } catch (error) {
          console.log(error);
      }
    },
    sendEmail({state}, data){
      return new Promise((resolve,reject) => {
        User.sendEmail(
              data,
            (response) => {
                resolve(response);
            },
            (error) => {
                reject(error);
            })
      }) 
    },
    registerUser({state}, data){
      return new Promise((resolve,reject) => {
        User.registerUser(
              data,
             (response) => {
                 resolve(response);
             },
             (error) => {
                 reject(error);
             } 
          )
      }) 
    },
    verifiPassOld({state}, data){
      console.log(data)
      return new Promise((resolve,reject) => {
        User.verifiPassOld(
              data,
             (response) => {
                 resolve(response);
             },
             (error) => {
                 reject(error);
             } 
          )
      }) 
    },

  }
};
