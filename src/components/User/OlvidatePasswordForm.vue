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
            email:"admin@admin.com",
        }
    }),

    methods:{
      ...mapActions("auth", ["sendEmailReset"]),
        async sendEmail(){
          this.value.email = "admin@admin.com"
          if(this.$refs.form.validate() == true)
          {
            console.log(this.value.email)
            let res = await this.sendEmailReset(this.value);
            this.$refs.form.reset()
            //this.value.email = "admin@admin.com",
            Swal.fire({
            icon: "success",
            title: "Email enviado",
            text: "Envio exitoso del email",
            });
          }
        }
    }
};
</script>
