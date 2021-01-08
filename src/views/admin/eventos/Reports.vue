<template>
  <v-card
    class="mx-auto"
    max-width="600"
    tile
  >
    <v-card-title class="heading-2">
      Reportes Estadisticos
      <v-spacer></v-spacer>
    </v-card-title>
    
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
        <ReportEventDayForm />
      </v-card-actions>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            3. Eventos realizados en un periodo de fechas
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <ReportEventPeriodForm />
      </v-card-actions>
      </v-list-item>
    </v-card>
</template>

<script>
import ReportStudentsForm from "@/components/Eventos/ReportStudentsForm";
import ReportEventDayForm from "@/components/Eventos/ReportEventDayForm";
import ReportEventPeriodForm from "@/components/Eventos/ReportEventPeriodForm";
export default {
  components: { ReportStudentsForm, ReportEventDayForm, ReportEventPeriodForm },
  data: () => ({
      
    }),
}
</script>

