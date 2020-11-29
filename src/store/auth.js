import User from '../api/User'
export default {
     namespaced: true,
    state: {
        authenticated: false,
        user: null
      },
    
      getters: {
        authenticated (state) {
          return state.authenticated
        },
    
        user (state) {
          return state.user
        },
      },
    
      mutations: {
        SET_AUTHENTICATED (state, value) {
          state.authenticated = value
        },
    
        SET_USER (state, value) {
          state.user = value
        }
      },
    
      actions: {
        async singIn ({dispatch}, credentials){
          try {
            let response = await User.login(credentials);
            if(response.status != 200){
              throw new Error(`HTTP error! status: ${response.status}`);
            } 
            dispatch('me');
          } catch (error) {
          }
        },

        async me({commit}){
          try {
            let response = await User.getUser();
            if(response.status != 200){
              throw new Error(`HTTP error! status: ${response.status}`);
            } 
            commit('SET_AUTHENTICATED', true)
            commit('SET_USER', response.data)
          } catch (error) {
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
          }
        }
      }
}