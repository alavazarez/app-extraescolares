<template>
  <v-card>
    <v-card-title class="heading-2">
      Proximos Eventos
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]>
        <v-btn x-small fab color="error" dark>
          <v-icon dark>mdi-trash-can</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "List",
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Nombre", value: "name" },
      { text: "Tipo", value: "type" },
      { text: "Lugar", value: "place" },
      { text: "Fecha", value: "date" },
      { text: "Hora", value: "time" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    data: [
      {
        id: 1,
        name: "Partido de basquetbol",
        type: "deportivo",
        place: "Campo 2",
        date: "24/02/2020",
        time: "06:30 pm"
      },
      {
        id: 2,
        name: "Partido de voleibol",
        type: "deportivo",
        place: "Campo 1",
        date: "30/06/2020",
        time: "06:30 pm"
      },
      {
        id: 3,
        name: "Honores a la bandera",
        type: "civico",
        place: "Patio civico",
        date: "24/02/2020",
        time: "09:00 am"
      },
      {
        id: 4,
        name: "Honores a la bandera",
        type: "civico",
        place: "Patio civico",
        date: "24/02/2020",
        time: "09:00 am"
      },
      {
        id: 5,
        name: "Honores a la bandera",
        type: "civico",
        place: "Patio civico",
        date: "24/02/2020",
        time: "09:00 am"
      }
    ]
  })
};
</script>
