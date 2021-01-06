import Api from "./Api";

export default {
    /**
     * Guardar evento.
     * @param {Object} Data -Objeto del dato a guardar.
     * @param {function} callback - respuesta sastifactoria
     * @param {function} callbackError - respuesta con error.
     */
    
    store(data,callback,callbackError){
        Api.post('api/evento/store',data)
            .then((response) => {
                callback(response) 
            }) 
            .catch((error) => {
                callbackError(error);
            })
    },
    update(data,callback,callbackError){
        Api.post('api/evento/edit/'+data.id, data)
          .then(response=>{
            callback(response) 
          })
          .catch(error=>{
              console.log(error)
              callbackError(error);
          })
    },
    destroy(data, callback, callbackError){
        Api.post('api/evento/destroy',data)
        .then((res)=>{
            callback(res) 
        })
        .catch((error)=>{
            callbackError(error);
        })
    },
    getEvents(){
        try {
            return Api.get('api/evento');
        } catch (error) {
            return error;
        }
    },
    storeAttendance(data){
        try {
            return Api.post('api/evento/asistencia',data)
        } catch (error) {
            return error;
        }
    }
}