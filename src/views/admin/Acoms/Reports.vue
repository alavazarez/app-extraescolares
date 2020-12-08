<template>
  <v-card height="200">
    <v-card-title class="heading-2">
      Reportes ACOMS
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card class="mx-auto" max-height="155" max-width="530" qoutlined>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            1. ACOM´s entregados a los estudiantes
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <ReportDeliverForm />
      </v-card-actions>
      </v-list-item>
   
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            2. ACOM´s por entregar a los estudiantes
        </v-list-item-title>
      </v-list-item-content>
      <v-card-actions>
        <ReportToDeliverForm />
      </v-card-actions>
      </v-list-item>
    </v-card>
  </v-card>
</template>

<script>
import ReportDeliverForm from "@/components/Acoms/ReportDeliverForm";
import ReportToDeliverForm from "@/components/Acoms/ReportToDeliverForm";
export default {
  components: { ReportDeliverForm, ReportToDeliverForm },
}
</script>

