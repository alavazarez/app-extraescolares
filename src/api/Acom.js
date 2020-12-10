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
updateacom(){
    try{
        return Api.post('api/acom/configuration/'+this.acoms.id,this.acoms)
        .then(response=>{
            console.log(response)
          })
    } catch (error) {
        console.log(error)
        return error;
    }
/*Api.post('api/acom/configuration/'+this.acoms.id,this.acoms)
                    .then(response=>{
                      console.log(response)
                    })
                .catch(error=>(
                    console.log(error)
                ))*/
}

}