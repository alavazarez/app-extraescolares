<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="primary" rounded v-bind="attrs" v-on="on">
        <v-icon dark>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Alumnos que asistieron a un evento extraescolar
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-text-field
              v-model="date"
              type="date"
              label="Fecha del evento"
             ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-select
                @click="obtenerEvents"
                :items="evento"
                label="Evento"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-select
                :items="sexo"
                label="Sexo"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-select
                :items="carrera"
                label="Carrera"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-select
                :items="semestre"
                label="Semestre"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
              <div class="my-2">
                <v-btn
                  text @click="exportar"
                  color="success"
                  fab
                  x-large
                  dark>
                  <v-icon>mdi-file-excel</v-icon>
                </v-btn>
              </div>
          </v-row>
          <v-row align="center" justify="space-around">
          <v-card-title>Generar Excel</v-card-title>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "ReportStudentsForm",
  data: () => ({
    evento: ['Partido de futbol', 'partido de basquetbol'],
    sexo: ['Masculino', 'Femenino'],
    carrera: ['Mecanica', 'Sistemas', 'Electrica'],
    date: [],
    semestre: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dialog:false
    }),
  
  computed:{
    ...mapGetters({
      //events: 'event/events',
    })
  },
    methods:{
    ...mapActions('event',['exportarAlumnos']),

      async exportar(){
        try {
          console.log("Aqui")
          await this.exportarAlumnos()
        } catch (error) {
        }
      },
      async obtenerEvents(){
        //Para obtener eventos de un dia
        try {
          await this.getEventsforDate()
        } catch (error) {
        }
      }
    }
};
</script>
