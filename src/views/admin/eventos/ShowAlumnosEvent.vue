<template>
  <div>
    <v-container fluid style="margin: 0px; padding: 50px; width: 100%">
      <v-card>
        <v-card-title class="heading-2">Ver alumnos que asistieron al evento</v-card-title>
        <v-data-table
          :headers="headers"
          :items="alumnos"
          sort-by="calories"
          class="elevation-1">
          <template v-slot:item.actions="{ item }">
          <v-btn @click="borrar(item)" x-small fab color="error" dark>
            <v-icon dark>mdi-trash-can</v-icon>
          </v-btn>
        </template>
        </v-data-table>
        <v-overlay v-model="overlay">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      idItem:this.$route.params.idItem,
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Numero de control", value: "no_de_control" },
        { text: "Carrera", value: "carrera" },
        { text: "Semestre", value: "semestre" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      data:{
        idEvento : 0,
        no_de_control : 0
      }
    };
  },
  mounted() {
    this.findEvent()
  },
  computed: {
    ...mapGetters({
      alumnos: "event/alumnosEvent",
      overlay: "event/overlay",
    }),
  },
  methods: {
    ...mapActions("event", ["getAlumnosEvent", "removeAsistenciaAlumno"]),

    async findEvent(){
      let response = await this.getAlumnosEvent(this.idItem)
    },

    async borrar(item) {
      Swal.fire({
        title: "¿Estas seguro de borrar la asistencia del alumno?",
        text: "Ya no podras revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar asistencia!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.data.idEvento = this.idItem
          this.data.no_de_control = item.no_de_control
          let response = this.removeAsistenciaAlumno(this.data)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Eliminado!",
                text:"El campo seleccionado ha sido eliminado",
                showConfirmButton: false,
                timer: 2500  
                });
              this.findEvent()
            })
            .catch((err) => {
              Swal.fire("Error!", "No pudo ser eliminado", "error");
            });
          }
      });
    },
  },
};
</script>
