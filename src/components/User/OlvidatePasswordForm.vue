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
          Cerrar
        </v-btn>
        <v-overlay v-model="overlay">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
            email:"",
        }
    }),
  computed: {
    ...mapGetters({
      overlay: "auth/overlay",
    }),
  },
    methods:{
      ...mapActions("auth", ["sendEmailReset"]),
        async sendEmail(){
          if(this.$refs.form.validate() == true)
          {
            let res = await this.sendEmailReset(this.value);
            if(res.status == 200)
            {
              Swal.fire({
              icon: "success",
              title: "Email enviado",
              text: "Envio exitoso del email",
              showConfirmButton: false,
              timer: 2500
              });   
              this.$refs.form.reset()
              this.value.email = ""; 
              this.$router.push('/User/ResetPassword')
            }
            else if(res.status)
            {
              Swal.fire({
              icon: "error",
              title: "Email no existe",
              text: "El correo electronico no es un usuario registrado",
              showConfirmButton: false,
              timer: 2500
              }); 
              this.$refs.form.reset()
              this.value.email = "";
            }
          }
        },
    }
};
</script>
