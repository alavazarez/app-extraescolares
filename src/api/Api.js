import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8001/"
});

Api.defaults.withCredentials = true;

export default Api;
