import Alumno from '../api/Alumno'
export default {
     namespaced: true,
      state: {
        alumnos:[],
        alumno:{},
        deportivo:0
      },
      getters: {
        alumnos (state){
            return state.alumnos;
        },
        alumno (state){
            return state.alumno;
        },
        deportivo (state){
            return state.deportivo;
        },
      },
    
      mutations: {
        SET_ALUMNOS (state, payload){
            state.alumnos = payload;
        },
        SET_ALUMNO (state, payload){
            state.alumno = payload;
        },
        SET_DEPORTIVO (state, payload){
            state.deportivo = payload;
        },
      },
    
      actions: {
        async getAlumnos({commit}){
            try {
                let response = await Alumno.getAlumnos();
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
                commit('SET_ALUMNOS',response.data);    
            } catch (error) {
                console.log(error);
            }
        },
        async find({commit},matricula){
            try {
                let response = await Alumno.find(matricula);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
                commit('SET_ALUMNO',response.data); 
                return true;   
            } catch (error) {
                return false;
            }
        },
        async getCount({commit},matricula){
            try {
                let response = await Alumno.getCount(matricula);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
                commit('SET_DEPORTIVO',response.data); 
                return true;   
            } catch (error) {
                return false;
            }
        },
                  
      }
}