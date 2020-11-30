import { Store } from "vuex";
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

    getEvents(){
        try {
            return Api.get('api/evento');
        } catch (error) {
            return error;
        }
    }
}