<template>
  <v-card>
    <v-card-title class="heading-2">
      ACOMS
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field label="Matricula" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field type="date" value="as"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    <v-data-table
      :headers="headers"
      :items="acoms"
      sort-by="calories"
      class="elevation-1">
      <template v-slot:[`item.actions`]>
        <v-btn x-small fab color="primary" dark>
          <v-icon dark>mdi-printer</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Acom from '../../../api/Acom'

export default {
  data: () => {
    return {
    headers: [
      { text: "Id", value: "id" },
      { text: "ID Alumno", value: "name" },
      { text: "ID Tipo de Acom", value: "typeAcom_id" },
      { text: "Fecha de Entrega", value: "dateDelivery" },
      { text: "Descripcion", value: "description" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    }
  },
  mounted(){
    this.getAcoms()
    console.log(this.acoms)
  },
  computed:{
    ...mapGetters({
      acoms: 'acom/acoms',
    })
  },
  methods:{
    ...mapActions('acom',['getAcoms']),
  },
}
</script>
