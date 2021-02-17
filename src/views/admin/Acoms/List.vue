<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        ACOMS
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-text-field
                label="Numero de control"
                type="number"
                required
                v-model="numControl"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-select
                :items="items"
                label="Filtrar"
                item-text="name"
                item-value="id"
                v-model="idFiltro"
                @change="filtrar"
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-data-table
        :headers="headers"
        :items="acoms"
        sort-by="calories"
        class="elevation-1"
        :search="numControl"
      >
      <template v-slot:item.dateDelivery="{ item }">
      {{ formatDate(item.dateDelivery) }}
    </template v-slot:item.actions="{ item }">
        <template v-slot:item.actions="{ item }">
          <v-btn @click="entregar(item)" x-small fab color="success" dark>
            <v-icon dark>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          <v-btn @click="borrar(item)" x-small fab color="error" dark>
            <v-icon dark>mdi-trash-can</v-icon>
          </v-btn>
          <v-overlay v-model="overlay">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  data: () => {
    return {
      numControl: "",
      //alumno:this.acoms.nombre,
      headers: [
        { text: "Numero de control", value: "no_de_control" },
        { text: "Nombre", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Carrera", value: "carrera" },
        { text: "Tipo de Liberación", value: "type" },
        { text: "Fecha de Liberación", value: "dateDelivery" },
        { text: "Descripción", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      items: [
        { id: 0, name: "Todos los ACOM´s" },
        { id: 1, name: "ACOM´s liberados" },
        { id: 2, name: "ACOM´s pendientes" },
      ],
      idFiltro: 0,
    };
  },
  mounted() {
    this.getAcoms();
  },
  computed: {
    ...mapGetters({
      overlay: "acom/overlay",
      acoms: "acom/acoms",
    }),
  },
  methods: {
    ...mapActions("acom", ["getAcoms", "deliver", "filtrosAcoms", "validarLiberacion", "destroy"]),

    formatDate(value) {
      return moment(value).format('DD/MM/YYYY HH:mm:ss')
  },

    async filtrar() {
      try {
        await this.filtrosAcoms(this.idFiltro);
      } catch (error) {}
    },
    entregar(item) {
      Swal.fire({
        title: "¿Desea entregar este ACOM?",
        text: "¡No podrás revertir esta accion!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, entregar ACOM",
        cancelButtonText: "NO, cancelar",
      }).then((result) => {
        if (result.isConfirmed && item.status == 0) {
          this.deliver(item)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "¡ACOM Entregado!",
                text: "Se ha entregado El ACOM al alumno seleccionado",
                showConfirmButton: false,
                timer: 2500
              });
            this.getAcoms();
            })
            .catch((err) => {
              Swal.fire("Error!", "No pudo ser entregado el ACOM", "error");
            });
        } 
        else if(result.isConfirmed == false)
        {}
        else {
          Swal.fire({
            icon: "error",
            title: "¡Error!",
            text: "Este ACOM ya fue entregado",
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
    },
    async borrar(item) {
      let response = await this.validarLiberacion(item.id)
      Swal.fire({
        title: "¿Estas seguro de borrar este ACOM?",
        text: "Ya no podras revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, eliminar ACOM del alumno!",
        cancelButtonText: "NO, cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          if(response.data == false)
          {
            Swal.fire({
            icon: "error",
            title: "¡Imposible eliminar!",
            text: "Este ACOM ya se encuentra liberado",
            showConfirmButton: false,
            timer: 2500
          });
          }
          else{
            this.destroy(item)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Eliminado!",
                text:"El ACOM del alumno seleccionado ha sido eliminado",
                showConfirmButton: false,
                timer: 2500  
                });
              this.getAcoms();
            })
            .catch((err) => {
              Swal.fire("Error!", "No pudo ser eliminado", "error");
            });
          }
        }
      });
    },
  },
};
</script>
