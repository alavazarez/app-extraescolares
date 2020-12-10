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
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{user.name}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{user.email}}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-group no-action sub-group v-for="(item, i) in items" :key="i">
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
import { mapGetters } from 'vuex'
export default {
  name: "Navbar",
  data: () => ({
    item: 0,
    drawer: null,
    items: [
      {
        text: "User",
        icon: "mdi-account",
        children: [
          { text: "Ver usuarios", icon: "mdi-account-plus", route: "/User/showUsers" }
        ]
      },
      {
        text: "Eventos",
        icon: "mdi-soccer",
        children: [
          { text: "Ver", icon: "mdi-format-list-bulleted", route: "/event/list" },
          { text: "Asignar", icon: "mdi-account-check-outline", route: "/event/asignar" },
          { text: "Reportes", icon: "mdi-file-document", route: "/event/reports" }
        ]
      },
      {
        text: "Actividad complementaria",
        icon: "mdi-soccer",
        children: [
          { text: "Ver", icon: "mdi-eye", route: "/acom/list" },
          { text: "Crear ", icon: "mdi-pencil", route: "/acom/create" },
          { text: "Configuracion ", icon: "mdi-message-processing", route: "/acom/configuration" },
          { text: "Reportes", icon: "mdi-file-document", route: "/acom/Reports" }
        ]
      },
      {
        text: "Estudiantes",
        icon: "mdi-soccer",
        children: [
          { text: "Eventos proximos", icon: "mdi-eye", route: "/students/upcoming" },
          { text: "Avance extraescolar", icon: "mdi-check", route: "/students/progress" }
        ]
      }
    ]
  }),
  computed:{
    ...mapGetters({
      user: 'auth/user',
    })
  }
};
</script>
