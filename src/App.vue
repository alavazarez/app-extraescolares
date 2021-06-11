<template>
  <v-app>
    <Navbar v-if="authenticated" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Narbar2";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated"
    })
  },
};
</script>
