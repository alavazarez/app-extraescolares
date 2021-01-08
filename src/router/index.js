import Vue from "vue";
import store  from "../store"
import VueRouter from "vue-router";
import Dashboard from "../views/admin/user/Dashboard.vue";
import showUsers from "../views/admin/user/ShowUsers.vue";
import ListEvent from "../views/admin/eventos/index.vue";
import Login from "../views/admin/user/Login.vue";
import Asignar from "../views/admin/eventos/Asignar.vue";
import Reports from "../views/admin/eventos/Reports.vue";
import ListAcom from "../views/admin/Acoms/List.vue";
import CreateAcom from "../views/admin/Acoms/Create.vue";
import ConfigurationAcom from "../views/admin/Acoms/Configuration.vue";
import ReportsAcom from "../views/admin/Acoms/Reports.vue";
import UpcomingEvents from "../views/Students/UpcomingEvents.vue";
import EventProgress from "../views/Students/EventProgress.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {requiresAuth:true}
  },
  {
    path: "/User/showUsers",
    name: "showUsers",
    component: showUsers
  },
  {
    path: "/event/index",
    name: "ListEvent",
    component: ListEvent,
    meta: {requiresAuth:true}

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
    meta: {requiresAuth:true}
  },
  {
    path: "/event/reports",
    name: "Reportes",
    component: Reports,
    meta: {requiresAuth:true}
  },
  {
    path: "/acom/list",
    name: "listAcom",
    component: ListAcom,
    meta: {requiresAuth:true}
  },
  
  {
    path: "/acom/create",
    name: "Crear",
    component: CreateAcom,
    meta: {requiresAuth:true}
  },
  {
    path: "/acom/configuration",
    name: "Configurar",
    component: ConfigurationAcom,
    meta: {requiresAuth:true}
  },
  {
    path: "/acom/reports",
    name: "Reportes",
    component: ReportsAcom,
    meta: {requiresAuth:true}
  },
  {
  path: "/students/upcoming",
    name: "Proximos",
    component: UpcomingEvents
  },
  {
    path: "/students/progress",
      name: "Progreso",
      component: EventProgress
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( (to, from, next) => {
  if (to.meta.requiresAuth) {
    if(store.state.auth.authenticated){
      next();
    }else{
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
