<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-3" fab v-bind="attrs" v-on="on"
        text
        color="primary"
      >Leer más
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">AVISO PARA LA COMUNIDAD ESTUDIANTIL</span>
      </v-card-title>
       <v-card-text>
        <v-row class="justify-start">
          <div class="text--primary">
            SE HACE DEL CONOCIMIENTO A TODO EL ALUMNADO DE ESTE INSTITUTO TECNOLÓGICO DE TUXTLA GUTIÉRREZ, PERTENECIENTE AL TECNOLÓGICO NACIONAL DE MÉXICO DE LA SECRETARÍA DE...
          </div>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clouse()">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LearnMore",
  data: () => ({
    dialog: false,
  }),
  methods: {
    clouse()
    {
      this.dialog=false
    },
  },
};
</script>
