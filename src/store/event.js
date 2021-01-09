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
        },
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
        update( {state} ,data){
            return new Promise((resolve,reject) => {
                Event.update(
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
        },
        async getEventsforDate({commit}, date){
            try {
                let response = await Event.getEventsforDate(date);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_EVENTS', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        exportarAlumnos({state} ,data){
            return new Promise((resolve,reject) => {
                Event.exportarAlumnos(
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
        exportarEvents({state} ,data){
            return new Promise((resolve,reject) => {
                Event.exportarEvents(
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
        exportarPeriodEvents({state}, data){
            return new Promise((resolve,reject) => {
                Event.exportarPeriodEvents(
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
        async getEventsForStudents({commit}){
            try {
                let response = await Event.getEventsForStudents();
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_EVENTS', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        
        
    }
}