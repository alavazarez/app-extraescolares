import Acom from '../api/Acom'
export default{
    namespaced: true,
    state: {
        overlay: false,
        acoms:[],
        acom:{},
        error:false
    },
    getters: {
        acoms(state){
            return state.acoms;
        },
        acom(state){
            return state.acom;
        },
        overlay(state) {
            return state.overlay;
          }
    },
    mutations: {
        SET_ACOMS(state, payload){
            state.acoms = payload;
        },
        SET_ERROR(state, payload){
            state.error = payload;
        },
        SET_ACOM(state, payload){
            state.acom = payload;
        },
        SET_OVERLAY(state, value) {
            state.overlay = value;
          }
    },
    actions: {
        //Trae los datos de los jefes que lleva el formato de ACOM
        async datosAcom({ commit }) {
            try {
              let response = await Acom.datosAcom();
              if (response.status != 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              commit("SET_ACOMS", response.data);
              return response.data;
            } catch (error) {
              return false;
            }
          },
        async getAcomData({commit}){
            try {
                let response = await Acom.getAcomData();
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_ACOM', response.data);
            } catch (error) {
                console.log(error);
            }      
        },
        async getAcoms({commit}){
            try {
                let response = await Acom.getAcoms();
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_ACOMS', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        updateacom({state} ,data){
            return new Promise((resolve,reject) => {
                Acom.updateacom(
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
        crear({commit} ,data){
            commit("SET_OVERLAY", true);
            return new Promise((resolve,reject) => {
                Acom.crear(
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
        deliver( {state} , datos){
            return new Promise((resolve,reject) => {
                Acom.deliver(
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
        exportarAcomLiberados({state}, data){
            return new Promise((resolve,reject) => {
                Acom.exportarAcomLiberados(
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
        exportarAcomsPendientes(){
            return new Promise((resolve,reject) => {
                Acom.exportarAcomsPendientes(
                   (response) => {
                       resolve(response);
                   },
                   (error) => {
                       reject(error);
                   } 
                )
            }) 
        },
        async filtrosAcoms({commit}, data){
            try {
                let response = await Acom.filtrosAcoms(data);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_ACOMS', response.data);
            } catch (error) {
                console.log(error);
            }
        },
    }
}