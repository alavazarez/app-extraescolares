import Alumno from "../api/Alumno";
export default {
  namespaced: true,
  state: {
    overlay: false,
    alumnos: [],
    alumno: {},
    progreso: {
      alumno: {},
      asistencias: [],
      formacionIntegral: {}
    }
  },
  getters: {
    alumnos(state) {
      return state.alumnos;
    },
    alumno(state) {
      return state.alumno;
    },
    progreso(state) {
      return state.progreso;
    },
    overlay(state) {
      return state.overlay;
    }
  },

  mutations: {
    SET_ALUMNOS(state, payload) {
      state.alumnos = payload;
    },
    SET_ALUMNO(state, payload) {
      state.alumno = payload;
    },
    SET_PROGRESO(state, payload) {
      state.progreso = payload;
    },
    SET_OVERLAY(state, value) {
      state.overlay = value;
    }
  },

  actions: {
    async getAlumnos({ commit }) {
      try {
        let response = await Alumno.getAlumnos();
        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        commit("SET_ALUMNOS", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async find({ commit }, matricula) {
      try {
        commit("SET_OVERLAY", true);
        let response = await Alumno.find(matricula);
        if (response.status != 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        commit("SET_ALUMNO", response.data);
        await commit("SET_OVERLAY", false);
        return response.data;
      } catch (error) {
        await commit("SET_OVERLAY", false);
        return false;
      }
    },
    generatePDFAlumno({ state }, data) {
      return new Promise((resolve, reject) => {
        Alumno.generatePDFAlumno(
          data,
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    validate({ state }, data) {
      return new Promise((resolve, reject) => {
        Alumno.validate(
          data,
          response => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    getProgreso({ commit }, matricula) {
      commit("SET_OVERLAY", true);
      Alumno.getAvanceEventos(matricula)
        .then(response => {
          commit("SET_PROGRESO", response.data);
          commit("SET_OVERLAY", false);
        })
        .catch(error => {
          commit("SET_OVERLAY", false);
          console.log(error, "error en avance");
        });
    },
    StatusExtraescolar({ commit }, matricula) {
      commit("SET_OVERLAY", true);
      return new Promise((resolve, reject) => {
        Alumno.StatusExtraescolar(
          matricula,
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
};
