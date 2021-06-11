<template>
  <div>
    <v-app-bar extended color="primary"></v-app-bar>
    <v-row align="center" justify="center">
      <v-col col="12" md="4" sm="5">
        <v-card style="margin-top: -50px">
          <v-card-title class=""> Iniciar sesión </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-6">
              <v-img
                max-height="200"
                max-width="200"
                src="../../../assets/tecnm.png"
              ></v-img>
              <v-img
                max-height="100"
                max-width="100"
                src="../../../assets/logo.png"
              ></v-img>
            </div>
            <v-text-field
              prepend-icon="mdi-account"
              v-model="form.email"
              label="Correo Electrónico"
            >
            </v-text-field>
            <v-text-field
              label="Contraseña"
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
            <v-btn large block @click="login" color="primary">Ingresar</v-btn>
          </v-card-actions>
          <v-card-actions >
            <OlvidatePasswordForm />
          </v-card-actions>
          <v-progress-linear :indeterminate="loading"></v-progress-linear>
        </v-card>
        <v-snackbar
          v-model="snackbar"
          :top="true"
          :right="true"
          :color="'error'"
        >
          {{ message }}
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import OlvidatePasswordForm from "@/components/User/OlvidatePasswordForm";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  components: { OlvidatePasswordForm },
  name: "login",
  data: () => ({
    showPassword: false,
    form: {
      email: "admin@admin.com",
      password: "password",
    },
    snackbar: false,
    message: "",
    value: false,
  }),
  computed: {
    ...mapGetters({
      loading: "auth/loading",
    }),
  },
  methods: {
    ...mapActions("auth", ["singIn"]),
    async login() {
        let response = await this.singIn(this.form)
        if(response == false)
        {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Usuario y/o contraseña incorrecta",
          showConfirmButton: false,
          timer: 2500
        })
      }
    },
  },
};
</script>
