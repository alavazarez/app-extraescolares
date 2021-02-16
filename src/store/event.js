import Event from '../api/Event'
export default {
    namespaced: true,
    state: {
        overlay: false,
        events:[],
        eventsAlumno:[],
        alumnosEvent:[],
        eventsReports:[],
        event:{
            nameEvent:'',
            type_event_id:0,
            description:'',
            date:undefined, //DateTime
            place:'',
            organizer:''
        },
      error:false
    },
    getters: {
        events(state){
            return state.events;
        },
        event(state){
            return state.event;
        },
        eventsAlumno(state){
            return state.eventsAlumno;
        },
        alumnosEvent(state){
            return state.alumnosEvent;
        },
        eventsReports(state){
            return state.eventsReports;
        },
        overlay(state) {
            return state.overlay;
          }
    },
    mutations: {
        SET_EVENTS(state, payload){
            state.events = payload;
        },
        SET_ERROR(state, payload){
            state.error = payload;
        },
        SET_EVENT(state, payload){
            state.event = payload;
        },
        SET_EVENTSALUMNO(state, payload){
            state.eventsAlumno = payload;
        },
        SET_EVENTSREPORTS(state, payload){
            state.eventsReports = payload;
        },
        SET_OVERLAY(state, value) {
            state.overlay = value;
        },
        SET_ALUMNOSEVENT(state, value) {
            state.alumnosEvent = value;
        },
    },
    actions: {
        setEvent({commit}, event){
            commit('SET_EVENT', event);
        },
        store({ commit } , datos){
            commit("SET_OVERLAY", true);
            return new Promise((resolve,reject) => {
                Event.store(
                    datos,
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
        validarEvent( {state} , datos){
            return new Promise((resolve,reject) => {
                Event.validarEvent(
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
        update({ commit }, data) {
            commit("SET_OVERLAY", true);
            return new Promise((resolve,reject) => {
                Event.update(
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
        destroy( {state} , datos){
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
        async storeAttendance({commit},data){
            try {
                let response = await Event.storeAttendance(data);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async getEventsforDate({commit}, date){
            try {
                let response = await Event.getEventsforDate(date);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_EVENTSREPORTS', response.data);
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
        async filtrosEventos({commit}, data){
            try {
                let response = await Event.filtrosEventos(data);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_EVENTS', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async getEventsAlumno({commit}, data){
            try {
                let response = await Event.getEventsAlumno(data);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_EVENTSALUMNO', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async getAlumnosEvent({commit}, data){
            try {
                commit("SET_OVERLAY", true);
                let response = await Event.getAlumnosEvent(data);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_ALUMNOSEVENT', response.data);
                commit("SET_OVERLAY", false);
            } catch (error) {
                commit("SET_OVERLAY", false);
                console.log(error);
            }
        },
        async removeAsistenciaAlumno({ commit }, data) {
            commit("SET_OVERLAY", true);
            return new Promise((resolve,reject) => {
                 Event.removeAsistenciaAlumno(
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
    }
}