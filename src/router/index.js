import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/admin/user/Dashboard.vue";
import ListEvent from "../views/admin/eventos/List.vue";
import Login from "../views/admin/user/Login.vue";
import Asignar from "../views/admin/eventos/Asignar.vue";
import ListAcom from "../views/admin/Acoms/List.vue";
import DeliversAcom from "../views/admin/Acoms/Delivers.vue";
import CreateAcom from "../views/admin/Acoms/Create.vue";
import ConfigurationAcom from "../views/admin/Acoms/Configuration.vue";


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
  },
  {
    path: "/acom/list",
    name: "listAcom",
    component: ListAcom
  },
  {
    path: "/acom/delivers",
    name: "Entregar",
    component: DeliversAcom
  },
  {
    path: "/acom/create",
    name: "Crear",
    component: CreateAcom
  },
  {
    path: "/acom/configuration",
    name: "Configurar",
    component: ConfigurationAcom
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
