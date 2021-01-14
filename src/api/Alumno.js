import Api from "./Api";

export default {
    getAlumnos() {
        try {
            return Api.get('api/alumnos/');
        } catch (error) {
            return error;
        }
    },

    find(matricula) {
        try {
            return Api.get('api/alumno/' + matricula);
        } catch (error) {
            return error;
        }
    },
    
    validate(data, callback, callbackError) {
        Api.get('api/alumnoEvent/' + data.idAlumno + '/' + data.idEvento)
            .then(response => {
                callback(response)
            })
            .catch(error => {
                console.log(error)
                callbackError(error);
            })
    },

    /*findAlumnoWithAcom(matricula) {
        try {
            return Api.get('api/findAcom/' + matricula);
        } catch (error) {
            return error;
        }
    },*/

    generatePDFAlumno(data,callback,callbackError){
        Api.get('api/acom/findAcomAlumno/'+data.id)
            .then(response=>{
        callback(response)
    })
    .catch(error => {
        console.log(error)
        callbackError(error);
    })
},
    
}