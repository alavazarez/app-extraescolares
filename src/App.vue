<template>
  <v-app>
    <Navbar v-if="authenticated"/>
    <v-main>
      <v-container class="mt-4">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Narbar2";
import { mapGetters } from 'vuex'
export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
  }),
  computed:{
    ...mapGetters({
      authenticated: 'auth/authenticated',
    })
  }
};
</script>
