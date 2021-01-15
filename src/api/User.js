import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async login(form) {
    try {
      await Csrf.getCookie();
      return Api.post("/login", form);
    } catch (err) {
      return err;
    }
  },

  async register(form) {
    try {
      axios.get('/sanctum/csrf-cookie').then(response => {
        return Api.post("/register", form);
      });
    } catch (error) {
      return error;
    }
  },

  async getUser() {
    try {
      const user = await Api.get("api/user");
      return user;
    } catch (error) {
      return error;
    }
  },

  async logout() {
    try {
      console.log("Llega")
      return Api.post("/logout");
    } catch (error) {
      return error;
    }
  },

  sendEmail(data, callback, callbackError){
    Api.get('api/user/sendEmail/'+data)
        .then(response=>{
            callback(response) 
        })
        .catch(error=>{
            console.log(error)
            callbackError(error);
        })
  },

  registerUser(data, callback, callbackError){
    Api.post('api/user/registerUser',data)
        .then(response=>{
            callback(response) 
        })
        .catch(error=>{
            console.log(error)
            callbackError(error);
        })
  },

}