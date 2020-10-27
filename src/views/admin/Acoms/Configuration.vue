<template>
  <v-card>
    <v-card-title class="heading-2">
      CONFIGURACION
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field label="Nombre del jefe del departamento" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Nombre del coordinador" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Cuerpo de la constancia"
                counter
                maxlength="120"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
          <v-btn
            depressed
            color="primary"
            >Actualizar
            </v-btn>
            </v-row>
        </v-container>
      </v-card-text>
  </v-card>
</template>
