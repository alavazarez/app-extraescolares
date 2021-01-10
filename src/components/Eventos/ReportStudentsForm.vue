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
                v-model="value.id"
                :items="events"
                label="Evento*"
                item-text="nameEvent"
                item-value="id"
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
    items: [
        {id:"id", name:"nameEvent"},
      ],
    date: [],
    dialog:false,
    value:{
      id:''}
    }),
  computed:{
    ...mapGetters({
      events: 'event/events',
    })
  },
    methods:{
    ...mapActions('event',['exportarAlumnos', 'getEventsforDate']),

      async exportar(){
        try {
          await this.exportarAlumnos(this.value.id)
        } catch (error) {
        }
      },
      async obtenerEvents(){
        //Para obtener eventos de un dia
        try {
          await this.getEventsforDate(this.date)
          } catch (error) {
        }
      },
    }
};
</script>
