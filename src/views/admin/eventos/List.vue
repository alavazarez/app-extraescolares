<template>
  <v-card>
    <v-card-title class="heading-2">
      Eventos
      <v-spacer></v-spacer>
      <RegisterForm />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]>
        <EditForm />
        <v-btn x-small fab color="error" dark>
          <v-icon dark>mdi-trash-can</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import RegisterForm from "@/components/Eventos/RegisterForm";
import EditForm from "@/components/Eventos/EditForm";
export default {
  name: "List",
  components: { RegisterForm, EditForm },
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
