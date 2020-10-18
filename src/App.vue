<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container class="mt-4">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Narbar2";
export default {
  name: "App",

  components: {
    Navbar
  },

  data: () => ({})
};
</script>
