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
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Contraseña anterior"
                v-bind:disabled="BotonDesabilitado"
                outlined
                v-model="value.oldPassword"
                type="password"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Contraseña nueva"
                v-bind:disabled="BotonDesabilitado"
                outlined
                v-model="value.newPassword"
                type="password"
                
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Confirmar contraseña nueva"
                v-bind:disabled="BotonDesabilitado"
                outlined
                v-model="value.confirmPassword"
                type="password"
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
export default {
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  mounted() {
  },
  data: () => ({
    BotonDesabilitado: true,
    BotonActualizar: true,
    BotonEditar: null,
    value:{
      oldPassword:"passwordpassword",
      newPassword:"",
      confirmPassword:""
    }
  }),
  methods:{
    ...mapActions("auth", ["updatePass"]),
    EditarContraseña() {
      this.BotonActualizar = false;
      this.BotonEditar = true;
      this.BotonDesabilitado = false;
      this.value.oldPassword = ""
    },
    Actualizar(){
      this.BotonActualizar = true;
      this.BotonEditar = false;
      this.BotonDesabilitado = true;
      this.value.oldPassword = "passwordpassword"
      this.value.newPassword = "",
      this.value.confirmPassword = ""
    },
    async updatePassword() {
      if(this.value.newPassword == this.value.confirmPassword)
      {
        if(this.value.oldPassword != this.value.newPassword && this.value.oldPassword != this.value.confirmPassword)
        { 
          let res = await this.updatePass(this.value.newPassword);
          alert("Todo Bien")
          this.Actualizar()
        }
        else{
          alert("error debe ser diferente a la anterior")
        }
      }
      else
      {
        alert("Las contraseñas no coinciden")
      }

    }
  }
}
</script>
