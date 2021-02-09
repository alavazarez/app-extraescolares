import axios from "axios";

const Api = axios.create({
  baseURL: process.env.VUE_APP_RUTA_API
});

Api.defaults.withCredentials = true;

export default Api;
