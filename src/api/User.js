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

  async logout(data) {
    try {
      return Api.post("api/logout",data);
    } catch (error) {
      return error;
    }
  },

  registerUser(data, callback, callbackError){
    Api.post('api/user/registerUser',data)
        .then(response=>{
            callback(response) 
        })
        .catch(error=>{
            callbackError(error);
        })
  },
  verifiPassOld(data, callback, callbackError){
    Api.post('api/user/verifiPassOld/'+data.user,data)
        .then(response=>{
            callback(response) 
        })
        .catch(error=>{
            callbackError(error);
        })
  },

  sendEmailReset(data, callback, callbackError){
    Api.post('api/user/sendEmailReset',data)
        .then(response=>{
            callback(response) 
        })
        .catch(error=>{
            callbackError(error);
        })
  },
  passwordReset(data, callback, callbackError){
    Api.post('api/user/passwordReset',data)
        .then(response=>{
            callback(response) 
        })
        .catch(error=>{
            callbackError(error);
        })
  },

}