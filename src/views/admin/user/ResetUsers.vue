<template>
  <v-container >
    <v-card>
      <v-card-title class="heading-2">
        Resetear contraseña
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row align="center" justify="center">
            <v-col cols="3">
              <v-text-field
                :rules="emailRules"
                v-model="value.email"
                label="Correo electronico"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="3">
              <v-text-field
                type="number"
                :rules="codeRules"
                v-model="value.verification_code"
                label="Codigo de verificación"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="3">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show3 = !show3"
                v-model="value.password"
                label="Contraseña nueva"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="3">
              <v-text-field
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show1 = !show1"
                v-model="value.password_confirmation"
                label="Confirmar contraseña nueva"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
              <v-btn
                x-large
                depressed
                color="primary"
                @click="resetPassword"
                :disabled="!valid"
                >Actualizar Contraseña
              </v-btn>
          </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from "sweetalert2";
export default {
    data() {
      return {
        valid: true,
        value:{
          email:'',
          verification_code: '',
          password: '',
          password_confirmation: ''
        },
        show1: false,
        show3: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Minimo 8 caracteres',
          emailMatch: () => (`The email and password you entered don't match`),
        },
        emailRules: [
        v => !!v || 'El Email es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        codeRules: [
        v => !!v || 'El codigo es requerido',
        v => (v && v.length == 6) || 'El codigo de verificacion debe de ser de 6 numeros',
      ],
      }
    },
  methods:{
    ...mapActions("auth", ["passwordReset"]),

    async resetPassword(){
      if(this.$refs.form.validate() == true)
      {
      let res = await this.passwordReset(this.value); 
      if(res.status == 200)
      {
        Swal.fire({
            icon: "success",
            title: "¡Usuario Actulizado!",
            text: "Las credenciales del usuario se han actualizado",
          });
          this.$refs.form.reset()
          this.clearInputs()
          //this.$router.push('/login')
      }
      else{
        Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Ha ocurrido un error, vuelva a intentarlo",
          });
        }
      }
    },
    clearInputs()
    {
      this.value.email="",
      this.value.verification_code=""
      this.value.password=""
      this.value.password_confirmation=""
    }
  }
}
</script>
