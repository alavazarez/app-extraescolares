import Vue from "vue";
import Vuex from "vuex";
import alumno from "./alumno";
import auth from './auth';
import event from './event';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth:auth,
    event:event,
    alumno:alumno
  }
});
