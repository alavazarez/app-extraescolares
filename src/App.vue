<template>
  <v-app>
    <v-app-bar
      color="blue" 
      dark
    >
       <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
    </v-app-bar>
    
      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      >
      
      </v-navigation-drawer>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    drawer: true,
    mini: true,
  })
};
</script>
