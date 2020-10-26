import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000/"
});

Api.defaults.withCredentials = true;

export default Api;
