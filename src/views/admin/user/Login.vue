<template>
  <v-row align="center" justify="center">
    <v-col col="12" md="4" sm="6">
      <v-card>
        <v-card-title v-if="user.name">Login {{ user.name }}</v-card-title>
        <v-card-text>
          <v-text-field
            prepend-icon="mdi-account"
            v-model="form.email"
            label="Correo Electrónico"
          >
          </v-text-field>
          <v-text-field
            label="form"
            v-model="form.password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="login" color="primary" text>Ingresar</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snackbar" :top="true" :right="true" :color="'error'">
        {{ message }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import User from "@/api/User";
export default {
  name: "login",
  data: () => ({
    showPassword: false,
    form: {
      email: "admin@admin.com",
      password: "password"
    },
    user: {},
    snackbar: false,
    message: ""
  }),
  methods: {
    async login() {
      await User.login(this.form);
      this.user = await User.getUser();
      localStorage.setItem("auth", true);
    },
    async logout() {
      await User.logout();
      localStorage.removeItem("auth");
    },
  }
};
</script>
