<template>
  <v-card>
    <v-card-title class="heading-2">
      Eventos
      <v-spacer></v-spacer>
      <v-btn class="mx-3" fab color="primary" dark v-bind="attrs" v-on="on">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "RegisterForm",
  data: () => ({
    headers: [
      { text: "Id", value: "id" },
      { text: "Nombre", value: "name" },
      { text: "Tipo", value: "type" },
      { text: "Fecha", value: "date" },
      { text: "Actions", value: "actions", sortable: false }
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
        name: "Partido de futbol",
        type: "deportivo",
        date: "24/02/2020"
      }
    ]
  })
};
</script>
