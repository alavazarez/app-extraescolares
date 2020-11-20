<template>
  <v-card height="280">
    <v-card-title class="heading-2">
      Reportes Estadisticos
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card class="mx-auto" max-height="155" max-width="530" qoutlined>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            1. Estudiantes que asistieron a un evento extraescolar
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <ReportStudentsForm />
      </v-card-actions>
      </v-list-item>
   
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            2. Eventos realizados en un dia especifico
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn depressed color="primary" rounded>
        <v-icon dark>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
      </v-card-actions>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            3. Eventos realizados en un periodo de fechas
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <v-btn depressed color="primary" rounded>
        <v-icon dark>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
      </v-card-actions>
      </v-list-item>
    </v-card>
  </v-card>
</template>

<script>
import ReportStudentsForm from "@/components/Eventos/ReportStudentsForm";
export default {
  components: { ReportStudentsForm },
}
</script>

