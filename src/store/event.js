import Event from '../api/Event'
export default {
    namespaced: true,
    state: {
      events:[],
      error:false
    },
    getters: {
        events(state){
            return state.events;
        }
    },
    mutations: {
        SET_EVENTS(state, payload){
            state.events = payload;
        },
        SET_ERROR(state, payload){
            state.error = payload;
        },
    },
    actions: {
        store( {state} ,datos){
            return new Promise((resolve,reject) => {
                Event.store(
                    datos,
                   (response) => {
                       resolve(response);
                   },
                   (error) => {
                       reject(error);
                   } 
                )
            })
        },
        destroy( {state} , datos){
            console.log(datos);
            return new Promise((resolve,reject) => {
                Event.destroy(
                    datos,
                   (response) => {
                       resolve(response);
                   },
                   (error) => {
                       reject(error);
                   } 
                )
            })
        },
        async getEvents({commit}){
            try {
                let response = await Event.getEvents();
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_EVENTS', response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}