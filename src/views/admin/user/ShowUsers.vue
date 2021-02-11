<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        Editar mi perfil
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Nombre del usuario"
                outlined
                readonly
                v-model="user.name"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Correo electronico"
                outlined
                readonly
                v-model="user.email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row>
            <v-col cols="3">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show3 = !show3"
                label="Contraseña anterior"
                v-bind:disabled="BotonDesabilitado"
                outlined
                v-model="value.oldPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          </v-form>
          <v-row>
            <v-col cols="3">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show3 = !show3"
                label="Contraseña nueva"
                v-bind:disabled="BotonDesabilitado"
                outlined
                v-model="value.newPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show3 = !show3"
                label="Confirmar contraseña nueva"
                v-bind:disabled="BotonDesabilitado"
                outlined
                v-model="value.confirmPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
              <v-btn
                @click="EditarContraseña()"
                x-large
                depressed
                color="success"
                v-bind:disabled="BotonEditar">
                <v-icon left>
                  mdi-pencil
                </v-icon>
                Editar contraseña
              </v-btn>
              <v-btn
                x-large
                depressed
                color="primary"
                v-bind:disabled="BotonActualizar"
                @click="updatePassword"
                >Actualizar Contraseña
              </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  mounted() {
  },
    data() {
    return {
    BotonDesabilitado: true,
    BotonActualizar: true,
    BotonEditar: null,
    value:{
      oldPassword:"passwordpassword",
      newPassword:"",
      confirmPassword:""
    },
    valid: true,
    show3: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Minimo 8 caracteres',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      data:{
        oldPassword:"",
        newPassword: "",
        user: "",
      }
    }
    },
  methods:{
    ...mapActions("auth", ["verifiPassOld"]),
    
    EditarContraseña() {
      this.BotonActualizar = false
      this.BotonEditar = true
      this.BotonDesabilitado = false
      this.$refs.form.reset()
      this.value.oldPassword = ""
    },
    Actualizar(){
      this.BotonActualizar = true;
      this.BotonEditar = false;
      this.BotonDesabilitado = true;
      this.$refs.form.reset()
      this.value.oldPassword = "             "
      this.value.newPassword = "",
      this.value.confirmPassword = ""
    },
    async updatePassword() {
      if(this.$refs.form.validate() == true)
      {
        if(this.value.newPassword == this.value.confirmPassword)
        {
          if(this.value.oldPassword != this.value.newPassword && this.value.oldPassword != this.value.confirmPassword)
          { 
            this.data.oldPassword = this.value.oldPassword
            this.data.newPassword = this.value.newPassword
            this.data.user = this.user.id
            let res = await this.verifiPassOld(this.data)
            if(res.data == false)
            {
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La contraseña anterior es incorrecta",
            });
            }
            else{
              console.log(res.data)
              Swal.fire({
              icon: "success",
              title: "Contraseña actualizada",
              text: "La contraseña se ha cambiado",
              });
              this.Actualizar()
            }
          }
          else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La contraseña nueva tiene que ser diferente a la anterior",
            });
          }
        }
        else
        {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La nueva contraseña no coinciden",
            });
        }
      }
    },
    clean(){
      
    }
  }
}
</script>
