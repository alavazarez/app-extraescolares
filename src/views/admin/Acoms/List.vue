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
        <template v-slot:item.actions="{ item }">
          <v-btn @click="entregar(item)" x-small fab color="success" dark>
            <v-icon dark>mdi-checkbox-marked-circle</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
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
        { text: "Semestre", value: "semestre" },
        { text: "Tipo de Liberacion", value: "type" },
        { text: "Fecha de Entrega", value: "dateDelivery" },
        { text: "Descripcion", value: "description" },
        { text: "Status", value: "status" },
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
      acoms: "acom/acoms",
    }),
  },
  methods: {
    ...mapActions("acom", ["getAcoms", "deliver", "filtrosAcoms"]),

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
              Swal.fire(
                "¡ACOM Entregado!",
                "Se ha entregado El ACOM al alumno seleccionado",
                "success"
              );
              this.getAcoms();
            })
            .catch((err) => {
              Swal.fire("Error!", "No pudo ser entregado el ACOM", "error");
            });
        } 
        else if(result.isConfirmed == false)
        {}
        else {
          Swal.fire("Error!", "Este ACOM ya fue entregado", "error");
        }
      });
    },
  },
};
</script>
