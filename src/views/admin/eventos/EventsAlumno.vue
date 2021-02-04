<template>
  <div>
        <v-container fluid style="margin: 0px; padding: 50px; width: 100%">          
          <v-card>
               <v-card-title class="heading-2">Eventos del alumno</v-card-title>
            <v-card-text>
                  <v-row align="center">
                    <v-col cols="12" sm="12" md="7">
                      <v-text-field
                        label="No de control"
                        v-model="matricula"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-btn class="block" color="primary" @click="findAlumno">
                        Buscar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
            <v-data-table
              :headers="headers"
              :items="events"
              sort-by="calories"
              class="elevation-1"
            ></v-data-table>
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
      headers: [
        { text: "Nombre", value: "nameEvent" },
        { text: "Tipo de evento", value: "type" },
        { text: "Organizador", value: "organizer" },
        { text: "Fecha", value: "date" },
        { text: "Lugar", value: "place" },
        { text: "Descripcion", value: "description" },
      ],
      matricula: "",
    };
  },
  mounted() {
    this.getEventsAlumno()
  },
  computed: {
    ...mapGetters({
      events: "event/events",
    }),
  },
  methods: {
    ...mapActions("event", ["getEventsAlumno"]),
    ...mapActions("alumno", ["find"]),

    async findAlumno(){
      try {
        let res = await this.find(this.matricula);
        if (res == false) {
          Swal.fire({
            icon: "error",
            title: "¡El alumno no existe!",
            text: "Numero de control incorrecto",
          });
        } else {
        let res = await this.getEventsAlumno(this.matricula)
        console.log(res)
        } 
      }catch (error) {
        alert(error, "error de vue");
      }
      
    },
  },
};
</script>
