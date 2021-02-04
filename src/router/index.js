import Vue from "vue";
import store from "../store"
import VueRouter from "vue-router";

import Login from "../views/admin/user/Login.vue";
import showUsers from "../views/admin/user/ShowUsers.vue";
import AddUser from "../views/admin/user/AddUser.vue";
import ResetPassword from "../views/admin/user/ResetUsers.vue";

import ListEvent from "../views/admin/eventos/index.vue";
import Asignar from "../views/admin/eventos/Asignar.vue";
import Consultar from "../views/admin/eventos/EventsAlumno.vue";
import Reports from "../views/admin/eventos/Reports.vue";

import ListAcom from "../views/admin/Acoms/List.vue";
import CreateAcom from "../views/admin/Acoms/Create.vue";
import ConfigurationAcom from "../views/admin/Acoms/Configuration.vue";
import ReportsAcom from "../views/admin/Acoms/Reports.vue";

import DashboardEstudiantes from "../views/Students/Dashboard.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/User/showUsers",
    name: "showUsers",
    component: showUsers,
    meta: { requiresAuth: true }
  },
  {
    path: "/User/ResetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/User/AddUser",
    name: "AddUser",
    component: AddUser,
    meta: { requiresAuth: true }
  },
  {
    path: "/event/index",
    name: "ListEvent",
    component: ListEvent,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/event/asignar",
    name: "Asignar",
    component: Asignar,
    meta: { requiresAuth: true }
  },
  {
    path: "/event/consultar",
    name: "Consultar",
    component: Consultar,
    meta: { requiresAuth: true }
  },
  {
    path: "/event/reports",
    name: "Reportes",
    component: Reports,
    meta: { requiresAuth: true }
  },
  {
    path: "/acom/list",
    name: "listAcom",
    component: ListAcom,
    meta: { requiresAuth: true }
  },
  {
    path: "/acom/create",
    name: "Crear",
    component: CreateAcom,
    meta: { requiresAuth: true }
  },
  {
    path: "/acom/configuration",
    name: "Configurar",
    component: ConfigurationAcom,
    meta: { requiresAuth: true }
  },
  {
    path: "/acom/reports",
    name: "Reportes",
    component: ReportsAcom,
    meta: { requiresAuth: true }
  },
  {
    path: "/",
    name: "DashboardEstudiantes",
    component: DashboardEstudiantes,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.auth.authenticated) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
