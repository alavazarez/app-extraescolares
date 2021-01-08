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
      <template v-slot:item.actions="{ item }">
        <v-btn 
          @click="entregar(item)"
          x-small 
          fab color="success" 
          dark>
          <v-icon dark>mdi-checkbox-marked-circle</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2'

export default {
  data: () => {
    return {
    headers: [
      { text: "Id", value: "id" },
      { text: "ID Alumno", value: "alumno_id" },
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
  },
  computed:{
    ...mapGetters({
      acoms: 'acom/acoms',
    })
  },
  methods:{
    ...mapActions('acom',['getAcoms', 'deliver']),

    entregar(item){
      Swal.fire({
        title: '¿Desea entregar este ACOM?',
        text: "¡No podrás revertir esta accion!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, entregar ACOM',
        cancelButtonText: 'NO, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deliver(item)
          .then((res)=>{
            Swal.fire(
            '¡ACOM Entregado!',
            'Se ha entregado El ACOM al alumno seleccionado',
            'success'
          )
          this.getAcoms();
          })
          .catch((err)=>{
            Swal.fire(
            'Error!',
            'No pudo ser entregado el ACOM',
            'error'
          )
          })
        }
      })
    },
  },
}
</script>
