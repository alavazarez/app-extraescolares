<template>
  <v-container>
    <v-card>
    <v-card-title class="heading-2">
      Nuevo usuario
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Nombre"
                :rules="nameRules"
                outlined
                required
                v-model="value.nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Apellidos"
                :rules="apellidosRules"
                outlined
                required
                v-model="value.apellidos"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Correo electronico"
                :rules="emailRules"
                outlined
                required
                v-model="value.email"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show1 = !show1"
                label="Contraseña"
                outlined
                required
                v-model="value.password"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show2 = !show2"
                label="Confirmar contraseña"
                outlined
                required
                v-model="value.confirmPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-btn
                x-large
                :disabled="!valid"
                depressed
                color="primary"
                @click="registrarUsuario"
                >Registrarme
              </v-btn>
              <v-overlay v-model="overlay">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
          </v-row>
          </v-form>
        </v-container>
      </v-card-text>
  </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "AddUser",
  data() {
    return {
      valid: true,
      nameRules: [
        v => !!v || 'Nombre es requerido',
        v => (v && v.length <= 50) || 'El nombre debe tener menos de 50 caracteres',
      ],
      apellidosRules: [
        v => !!v || 'Apellidos es requerido',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    value: {
          nombre: "",
          apellidos: "",
          email: "",
          password: "",
          confirmPassword: ""
          },
    data: {
      name: "",
      email: "",
      password: "",
      isAdmin:false
    },
        show1: false,
        show2: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Minimo 8 caracteres',
          emailMatch: () => (`The email and password you entered don't match`),
        },
        
    }
  },
  computed: {
    ...mapGetters({
      overlay: "auth/overlay",
    }),
  },
  methods: {
    ...mapActions("auth", ["registerUser"]),

    async registrarUsuario() {
      if(this.$refs.form.validate() == true)
      {
      this.data.name = this.value.nombre+" "+this.value.apellidos
      this.data.email = this.value.email
      this.data.password = this.value.password
      if(this.value.password == this.value.confirmPassword)
      {
        let res = await this.registerUser(this.data)
        if(res.data == false)
      {
        Swal.fire({
            icon: "error",
            title: "¡Correo incorrecto!",
            text: "El correo que ha ingresado ya existe, intente con otro",
            showConfirmButton: false,
            timer: 2500
          });
      }
      else{
        this.$refs.form.reset()
        this.clean()
        Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "El usuario se ha registrado",
            showConfirmButton: false,
            timer: 2500
          });
      }
      }
      else{
        Swal.fire({
            icon: "error",
            title: "¡Contraseñas invalidas!",
            text: "Las contraseñas que ha ingresado no coinciden",
            showConfirmButton: false,
            timer: 2500
          });
      }
    }
  },
    clean(){
      this.value.nombre= "",
      this.value.apellidos= "",
      this.value.email= "",
      this.value.password= "",
      this.value.confirmPassword= ""
    }

  },
};
</script>

