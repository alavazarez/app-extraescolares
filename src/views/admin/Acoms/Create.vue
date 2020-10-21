<template>
  <v-card>
    <v-card-title class="heading-2">
      Crear ACOM
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-text-field label="Matricula" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    <v-data-table
      :headers="headers"
      :items="data"
      sort-by="calories"
      class="elevation-1">
      <template v-slot:[`item.actions`]>
        <CreateForm />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import CreateForm from "@/components/Acoms/CreateForm";
export default {
  name: "Delivers",
  components: { CreateForm },
  data: () => ({
    headers: [
      { text: "Matricula", value: "matri" },
      { text: "Nombre", value: "name" },
      { text: "Carrera", value: "carrer" },
      { text: "Semestre", value: "semester" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    data: [
      {
        matri: 16270736,
        name: "Manuel de Jesus Alavazarez Hernandez",
        carrer: "Ingenieria en Sistemas Computacionales",
        semester: "9°"
      },
      {
        matri: 16270837,
        name: "Eduardo Vazquez Bravo",
        carrer: "Ingenieria Mecanica",
        semester: "8°"
      }
    ]
  })
}
</script>

