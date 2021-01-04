import Api from "./Api";

export default {
    getAlumnos(){
        try {
            return Api.get('api/alumnos/');
        } catch (error) {
            return error;
        }
    },

    find(matricula){
        try {
            return Api.get('api/alumno/' + matricula);
        } catch (error) {
            return error;
        }
    },

    getCount(matricula){
        try {
            return Api.get('api/alumno/count/' + matricula);
        } catch (error) {
            return error;
        }
    }
}