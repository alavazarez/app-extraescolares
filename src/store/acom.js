import Acom from '../api/Acom'
export default{
    namespaced: true,
    state: {
        acoms:[],
        error:false
    },
    getters: {
        acoms(state){
            return state.acoms;
        },
    },
    mutations: {
        SET_ACOMS(state, payload){
            state.acoms = payload;
        },
        SET_ERROR(state, payload){
            state.error = payload;
        },
    },
    actions: {
        async getAcomData({commit}){
            try {
                let response = await Acom.getAcomData();
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                commit('SET_ACOMS', response.data);
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
        crear({state} ,data){
            return new Promise((resolve,reject) => {
                Acom.crear(
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
    }
}