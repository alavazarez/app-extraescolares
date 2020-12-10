import { Store } from "vuex";
import Api from "./Api";

export default{

getAcomData(){
    try {
        return Api.get('api/acom/configuration');
    } catch (error) {
        return error;
    }
}
}