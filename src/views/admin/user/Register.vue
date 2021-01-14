<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        Registrar Usuarios
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Correo electronico del nuevo usuario"
                outlined
                v-model="value.email"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Confirmar Correo electronico"
                outlined
                v-model="value.confirmEmail"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-btn
              @click="send"
                x-large
                depressed
                color="primary"
                >Enviar solicitud
              </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data:() =>({
        value:{
            email:"",
            confirmEmail:""
        }
    }),
    methods:{
        async send(){
            this.value.email = "",
            this.value.confirmEmail = ""
        }
    }
}
</script>