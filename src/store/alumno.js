import Alumno from '../api/Alumno'
export default {
     namespaced: true,
      state: {
        alumnos:[],
        alumno:{},
      },
      getters: {
        alumnos (state){
            return state.alumnos;
        },
        alumno (state){
            return state.alumno;
        },
      },
    
      mutations: {
        SET_ALUMNOS (state, payload){
            state.alumnos = payload;
        },
        SET_ALUMNO (state, payload){
            state.alumno = payload;
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
                return response.data;   
            } catch (error) {
                return false;
            }
        },
        generatePDFAlumno({state}, data){
            return new Promise((resolve,reject) => {
                Alumno.generatePDFAlumno(
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
        validate({state}, data){
            return new Promise((resolve,reject) => {
                Alumno.validate(
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
        /*async findAlumnoWithAcom({commit},matricula){
            try {
                let response = await Alumno.findAlumnoWithAcom(matricula);
                if(response.status != 200){
                    throw new Error(`HTTP error! status: ${response.status}`);
                } 
                commit('SET_ALUMNO',response.data); 
                return response.data;   
            } catch (error) {
                return false;
            }
        },*/
      }
}