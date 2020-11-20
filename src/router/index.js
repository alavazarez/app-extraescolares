import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/admin/user/Dashboard.vue";
import showUsers from "../views/admin/user/ShowUsers.vue";
import ListEvent from "../views/admin/eventos/List.vue";
import PreviousEvent from "../views/admin/eventos/PreviousEvents.vue";
import Login from "../views/admin/user/Login.vue";
import Asignar from "../views/admin/eventos/Asignar.vue";
import Reports from "../views/admin/eventos/Reports.vue";
import ListAcom from "../views/admin/Acoms/List.vue";
import DeliversAcom from "../views/admin/Acoms/Delivers.vue";
import CreateAcom from "../views/admin/Acoms/Create.vue";
import ConfigurationAcom from "../views/admin/Acoms/Configuration.vue";
import ReportsAcom from "../views/admin/Acoms/Reports.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/User/showUsers",
    name: "showUsers",
    component: showUsers
  },
  {
    path: "/event/list",
    name: "ListEvent",
    component: ListEvent
  },
  {
    path: "/event/previouslist",
    name: "PreviousEvent",
    component: PreviousEvent
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
    path: "/event/reports",
    name: "Reportes",
    component: Reports
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
  },
  {
    path: "/acom/reports",
    name: "Reportes",
    component: ReportsAcom
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
