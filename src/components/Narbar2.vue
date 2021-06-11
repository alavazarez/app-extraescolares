<template>
  <nav>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="editPerfil()" text color="primary">Editar Perfil</v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="logout" text color="primary">Cerrar Sesion</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer  width="330" app v-model="drawer">
      <div class="text-center mt-3">
        <v-avatar color="primary" size="60">
          <span class="white--text headline"> {{ letra }} </span>
        </v-avatar>
      </div>

      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-group
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          v-for="(item, i) in items"
          :key="i"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            :to="child.route"
          >
            <v-list-item-title v-text="child.text"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="child.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import alert from "../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data: () => ({
    letra: "",
    item: 0,
    drawer: null,
    items:[]
  }),
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    this.letra = this.user.name.charAt(0);
    if (this.user.isAdmin == 1) {
      this.items= [
      {
        text: "Usuarios",
        icon: "mdi-account",
        children: [
          {
            text: "Nuevo usuario",
            icon: "mdi-account-plus",
            route: "/User/AddUser",
          },
        ],
      },
      {
        text: "Eventos",
        icon: "mdi-soccer",
        children: [
          {
            text: "Ver",
            icon: "mdi-format-list-bulleted",
            route: "/event/index",
          },
          {
            text: "Asignar",
            icon: "mdi-account-check-outline",
            route: "/event/asignar",
          },
          {
            text: "Consultar",
            icon: "mdi-arrow-right-bold-circle-outline",
            route: "/event/consultar",
          },
          {
            text: "Reportes",
            icon: "mdi-file-document",
            route: "/event/reports",
          },
        ],
      },
      {
        text: "Actividad complementaria",
        icon: "mdi-soccer",
        children: [
          { text: "Ver", icon: "mdi-eye", route: "/acom/list" },
          { text: "Crear ", icon: "mdi-pencil", route: "/acom/create" },
          {
            text: "Configuracion ",
            icon: "mdi-message-processing",
            route: "/acom/configuration",
          },
          {
            text: "Reportes",
            icon: "mdi-file-document",
            route: "/acom/Reports",
          },
        ],
      },
    ]
    } else {
      this.items= [
      {
        text: "Eventos",
        icon: "mdi-soccer",
        children: [
          {
            text: "Ver",
            icon: "mdi-format-list-bulleted",
            route: "/event/index",
          },
          {
            text: "Asignar",
            icon: "mdi-account-check-outline",
            route: "/event/asignar",
          },
          {
            text: "Consultar",
            icon: "mdi-arrow-right-bold-circle-outline",
            route: "/event/consultar",
          },
          {
            text: "Reportes",
            icon: "mdi-file-document",
            route: "/event/reports",
          },
        ],
      },
      {
        text: "Actividad complementaria",
        icon: "mdi-soccer",
        children: [
          { text: "Ver", icon: "mdi-eye", route: "/acom/list" },
          { text: "Crear ", icon: "mdi-pencil", route: "/acom/create" },
          {
            text: "Configuracion ",
            icon: "mdi-message-processing",
            route: "/acom/configuration",
          },
          {
            text: "Reportes",
            icon: "mdi-file-document",
            route: "/acom/Reports",
          },
        ],
      },
    ]
    }
  },
  methods: {
    ...mapActions("auth", ["cerrarSesion"]),
    editPerfil()
    {
      this.$router.push({ path: '/User/showUsers' })
    },
    async logout() {
      let responseSwal = await alert.confirm(
        "Cerrar Sesión",
        "¿Está seguro de cerrar sesión?",
        "Si, salir!",
        "No, cancelar!"
      );
      if (responseSwal) {
        let response = await this.cerrarSesion(this.user);
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>
