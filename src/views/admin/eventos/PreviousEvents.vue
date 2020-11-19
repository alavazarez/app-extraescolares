<template>
  <v-card>
    <v-card-title class="heading-2">
      Eventos Realizados
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]>
        <v-btn x-small fab color="primary" dark>
          <v-icon dark>mdi-arrow-right-bold-circle</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "List",
  components: { },
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Nombre", value: "name" },
      { text: "Tipo", value: "type" },
      { text: "Fecha", value: "date" },
      { text: "Asistencia", value: "assistance" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    data: [
      {
        id: 1,
        name: "Partido de basquetbol",
        type: "deportivo",
        date: "24/02/2020",
        assistance: "59"
      },
      {
        id: 2,
        name: "Partido de voleibol",
        type: "deportivo",
        date: "01/12/2020",
        assistance: "59"
      },
      {
        id: 3,
        name: "Honores a la bandera",
        type: "civico",
        date: "01/12/2020",
        assistance: "59"
      },
    ]
  })
};
</script>
