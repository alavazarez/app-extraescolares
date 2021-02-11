<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        Editar mi perfil
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-bind:disabled="BotonDesabilitado"
                label="Nombre del usuario"
                outlined
                v-model="value.userName"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Correo electronico"
                outlined
                readonly
                v-model="user.email"
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
                label="Contraseña anterior"
                v-bind:disabled="BotonDesabilitado"
                outlined
                v-model="value.oldPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="3">
              <v-text-field
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show2 ? 'text' : 'password'"
                hint="Al menos 8 carácteres"
                class="input-group--focused"
                @click:append="show2 = !show2"
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
          </v-form>
          <v-row>
            <v-col cols="2">
              <v-btn
                @click="cancelar()"
                depressed
                color="error"
                v-bind:disabled="BotonActualizar">
                <v-icon left>
                  mdi-pencil
                </v-icon>
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                @click="EditarContraseña()"
                depressed
                color="success"
                v-bind:disabled="BotonEditar">
                <v-icon left>
                  mdi-pencil
                </v-icon>
                Editar perfil
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                depressed
                color="primary"
                v-bind:disabled="BotonActualizar"
                @click="updatePassword"
                >Actualizar perfil
              </v-btn>
              <v-overlay v-model="overlay">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
            </v-col>
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
      user: "auth/user",
      overlay: "auth/overlay",
    })
  },
  mounted() {
    this.value.userName = this.user.name
  },
    data() {
    return {
    BotonDesabilitado: true,
    BotonActualizar: true,
    BotonEditar: null,
    value:{
      userName:"",
      oldPassword:"passwordpassword",
      newPassword:"",
      confirmPassword:""
    },
    valid: true,
    show1: false,
    show2: false,
    show3: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Minimo 8 caracteres',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      data:{
        name:"",
        oldPassword:"",
        newPassword: "",
        user: "",
      }
    }
    },
  methods:{
    ...mapActions("auth", ["verifiPassOld"]),
    cancelar()
    {
      this.BotonActualizar = true;
      this.BotonEditar = false;
      this.BotonDesabilitado = true;
      this.value.userName = this.user.name;
      this.value.oldPassword = "passwordpassword"
      this.value.newPassword = "",
      this.value.confirmPassword = ""
      this.$refs.form.resetValidation()
    },
    EditarContraseña() {
      this.BotonActualizar = false
      this.BotonEditar = true
      this.BotonDesabilitado = false
      this.$refs.form.resetValidation()
      this.value.oldPassword = ""
      this.value.newPassword = "",
      this.value.confirmPassword = ""
    },
    Actualizar(){
      this.BotonActualizar = true;
      this.BotonEditar = false;
      this.BotonDesabilitado = true;
      this.user.name = this.data.name
      this.$refs.form.resetValidation()
      this.value.oldPassword = "passwordpassword"
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
            this.data.name = this.value.userName
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
              showConfirmButton: false,
              timer: 2500
            });
            }
            else{
              Swal.fire({
              icon: "success",
              title: "Contraseña actualizada",
              text: "La contraseña se ha cambiado",
              showConfirmButton: false,
              timer: 2500
              });
              this.Actualizar()
            }
          }
          else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La contraseña nueva tiene que ser diferente a la anterior",
              showConfirmButton: false,
              timer: 2500
            });
          }
        }
        else
        {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La nueva contraseña no coinciden",
              showConfirmButton: false,
              timer: 2500
            });
        }
      }
    }
  }
}
</script>
