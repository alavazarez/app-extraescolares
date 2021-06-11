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
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-text-field
              :rules="dateRules"
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
                :rules="eventRules"
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
                  :disabled="!valid"
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
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from "sweetalert2";
export default {
  name: "ReportStudentsForm",
  data: () => ({
    valid: true,
    items: [
        {id:"id", name:"nameEvent"},
      ],
      dateRules: [
        v => !!v || 'La fecha del evento es requerido',
      ],
      eventRules: [
        v => !!v || 'El evento es requerido',
      ],
    date: '',
    dialog:false,
    value:{
      id:''}
    }),
    mounted() {
    this.getEventsforDate()
  },
  computed:{
    ...mapGetters({
      events: 'event/eventsReports',
    })
  },
    methods:{
    ...mapActions('event',['exportarAlumnos', 'getEventsforDate']),

      async exportar(){
        if(this.$refs.form.validate() == true)
        {
        try {
          await this.exportarAlumnos(this.value.id)
        } catch (error) {
        }
        }
      },
      async obtenerEvents(){
        //Para obtener eventos de un dia
        if(this.date == '')
        {
          Swal.fire({
          icon: 'error',
          title: 'Selecciona una fecha',
          showConfirmButton: false,
          timer: 1500
        })
        }
        else
        {
        try {
          await this.getEventsforDate(this.date)
          } catch (error) {
        }
        }
      },
    }
};
</script>
