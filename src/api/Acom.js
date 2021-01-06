import Api from "./Api";

export default{

    getAcomData(){
        try {
            return Api.get('api/acom/configuration');
        } catch (error) {
            return error;
        }
    },
    getAcoms(){
        try {
            return Api.get('api/acom/index');
        } catch (error) {
            return error;
        }
    },
    updateacom(data,callback,callbackError){
        Api.post('api/acom/configuration/'+data.id, data)
            .then(response=>{
                callback(response) 
            })
            .catch(error=>{
                console.log(error)
                callbackError(error);
            })
    },
    crear(data,callback,callbackError){
        Api.post('api/acom/store', data)
            .then(response=>{
                callback(response) 
            })
            .catch(error=>{
                console.log(error)
                callbackError(error);
            })
    }

}