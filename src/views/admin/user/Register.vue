<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        Registrar Usuarios
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
                label="Correo electronico del nuevo usuario"
                outlined
                :rules="emailRules"
                v-model="value.email"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Confirmar Correo electronico"
                outlined
                :rules="emailRules"
                v-model="value.confirmEmail"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-btn
              @click="send"
                x-large
                :disabled="!valid"
                depressed
                color="primary"
                >Enviar solicitud
              </v-btn>
          </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
    data:() =>({
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        value:{
            email:"",
            confirmEmail:""
        }
    }),
    methods:{
      ...mapActions("auth", ["sendEmail"]),
        async send(){
          if(this.$refs.form.validate() == true)
          {
          if(this.value.email == this.value.confirmEmail){
            let res = await this.sendEmail(this.value.email);
            this.$refs.form.reset()
            this.value.email = "",
            this.value.confirmEmail = ""
            Swal.fire({
            icon: "success",
            title: "Email enviado",
            text: "Envio exitoso del email",
          });
            }
          else{
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No coinciden los correos electronicos",
          });
          }
        }
        }
    }
}
</script>