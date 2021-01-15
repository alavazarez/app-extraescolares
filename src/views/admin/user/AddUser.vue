<template>
  <v-container>
    <v-card>
    <v-card-title class="heading-2">
      Nuevo usuario
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Nombre"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Apellidos"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Correo electronico"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Contraseña"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Confirmar contraseña"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
              <v-btn
                x-large
                depressed
                color="primary"
                >Registrarme
              </v-btn>
          </v-row>
        </v-container>
      </v-card-text>
  </v-card>
  </v-container>
</template>
