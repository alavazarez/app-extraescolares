import axios from "axios";
import router from "../router/index"
import store from "../store"


const Api = axios.create({
  baseURL: "http://localhost:8001/"
});

Api.defaults.withCredentials = true;

Api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status == 401) {
    store.dispatch('auth/desautenticar')
    router.push({ name: 'Login'});
  }
  return Promise.reject(error);
})

export default Api;
