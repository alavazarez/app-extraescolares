import { Store } from "vuex";
import Api from "./Api";

export default{

getAcomData(){
    try {
        return Api.get('api/acom/configuration');
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
}

}