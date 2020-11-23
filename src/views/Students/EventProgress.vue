<template>
  <v-card>
    <v-card-title class="heading-2">
      Progreso de Eventos Extraescolares
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="center" justify="space-around">
          <v-col cols="2">
            <v-text-field label="Matricula*" required></v-text-field>
          </v-col>
          <v-col cols="3" >
            <v-btn
              color="primary"
              dark>
              Buscar
          </v-btn>
          </v-col>
          <v-col cols="3">
            <v-card-title>Curso Extraescolar</v-card-title>
          </v-col>
          <v-col cols="3">
            <v-text-field value="Banda de Guerra" solo disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-col cols="4">
            <v-card-title>Avance de eventos extraescolares</v-card-title>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-col cols="2">
            <v-card-title>Deportivo</v-card-title>
          </v-col>
          <v-col cols="1">
            <v-text-field value="3" solo disabled></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-card-title>Cultural</v-card-title>
          </v-col>
          <v-col cols="1">
            <v-text-field value="1" solo disabled></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-card-title>Civico</v-card-title>
          </v-col>
          <v-col cols="1">
            <v-text-field value="2" solo disabled></v-text-field>
          </v-col>
        </v-row>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="data"
            sort-by="calories"
            class="elevation-1">
          </v-data-table>
        </v-card>
        <v-container>
          <v-row align="center" justify="space-around">
            <v-btn
              x-large
              depressed
              color="primary"
              >Generar ACOM
            </v-btn>
            <v-btn
              x-large
              depressed
              color="primary"
              >Imprimir ACOM
            </v-btn>
          </v-row>
        </v-container>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EventProgress",
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Nombre", value: "name" },
      { text: "Tipo", value: "type" },
      { text: "Fecha", value: "date" }
    ],
    data: [
      {
        id: 1,
        name: "Partido de basquetbol",
        type: "deportivo",
        date: "24/02/2020"
      },
      {
        id: 2,
        name: "Partido de voleibol",
        type: "deportivo",
        date: "01/12/2020"
      },
      {
        id: 3,
        name: "Honores a la bandera",
        type: "civico",
        date: "01/12/2020"
      },
    ]
  })
};
</script>

