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
        </v-data-table>
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
        { text: "Nombre", value: "" },
        { text: "Numero de control", value: "" },
        { text: "Carrera", value: "" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.findEvent()
  },
  computed: {
    ...mapGetters({
      alumnos: "event/AlumnosEvent",
      overlay: "alumno/overlay",
    }),
  },
  methods: {
    ...mapActions("event", ["getEventsAlumno"]),

    async findEvent(){

      console.log(this.idItem)





      /*try {
        
        let res = await this.find(this.matricula);
        if (res == false) {
          Swal.fire({
            icon: "error",
            title: "¡El alumno no existe!",
            text: "Numero de control incorrecto",
          });
        } else {
        let response = await this.getEventsAlumno(this.matricula)
        } 
      }catch (error) {
        alert(error, "error de vue");
      }*/
      
    },
  },
};
</script>
