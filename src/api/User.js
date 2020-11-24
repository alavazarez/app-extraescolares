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
      return user.data;
    } catch (error) {
      return error;
    }
  },

  logout() {
    try {
      return Api.post("/logout");
    } catch (error) {
      return error;
    }
  }

}