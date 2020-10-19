import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/admin/user/Dashboard.vue";
import ListEvent from "../views/admin/eventos/List.vue";
import Login from "../views/admin/user/Login.vue";
import Asignar from "../views/admin/eventos/Asignar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/event/list",
    name: "ListEvent",
    component: ListEvent
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/event/asignar",
    name: "Asignar",
    component: Asignar
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
