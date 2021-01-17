<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <a
        v-bind="attrs" v-on="on"
        color="primary" 
        slot="activator" 
        >¿Olvido la contraseña?
      </a>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Ingresa tu correo electronico 
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row>
            <v-col cols="8">
              <v-text-field
                label="Correo electronico del usuario"
                outlined
                :rules="emailRules"
                v-model="value.email"
              ></v-text-field>
            </v-col>
          </v-row>
            <v-row>
            <v-col cols="8">
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
                @click="sendEmail"
                x-large
                :disabled="!valid"
                depressed
                color="primary"
                >Enviar email
              </v-btn>
          </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from "sweetalert2";
export default {
  name: "OlvidatePasswordForm",
  data:() =>({
      dialog:false,
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        value:{
            email:"example@example.com ",
            confirmEmail:"example@example.com "
        }
    }),

    methods:{
      ...mapActions("auth", ["sendEmailReset"]),
        async sendEmail(){
          if(this.$refs.form.validate() == true)
          {
          if(this.value.email == this.value.confirmEmail){
            let res = await this.sendEmailReset(this.value);
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
};
</script>
