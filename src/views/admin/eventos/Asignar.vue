<template>
  <v-stepper v-model="e1"
   non-linear 
   >
    <v-stepper-header>
      <v-stepper-step
         :complete="e1 > 1"
        step="1"
      >
        Seleccionar evento
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 1"
        step="2"
      >
        Seleccionar alumnos
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step 
      step="3"
      :complete="e1 > 1"
      editable
      >
        Confirmar asistencia
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-2"
        >
          <v-card-title>
            <v-row>
           <v-col md="4">
             <v-text-field
             v-model="date" 
             type="date"
             regular label="Fecha del evento"></v-text-field>
           </v-col>
           <v-col md="4">
             <v-select
              :items="items"
              label="Tipo de evento"
              item-text="name"
              item-value="id"
              ></v-select>
           </v-col>
         </v-row>
        </v-card-title>
        <v-data-table
        :headers="headers"
        show-select
        single-select
        :items="events"
        item-key="id"
        :search="date"
        ></v-data-table>
        </v-card>
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continuar
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-row>
          <v-col md="6">
            <v-card
            class="mb-2"
            >
              <v-card-title class="m-0">
                <v-row>
                  <v-col md="6">
                    <v-text-field
                    placeholder="Ingrese número de control"
                    v-model="matricula" 
                    regular label="Número de control"></v-text-field>
                  </v-col>
                   <v-col sm=12 md="6" class="mt-4">
                     <v-btn small
                     @click="findAlumno"
                     > 
                       Buscar
                     </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <div class="ml-4"> 
                  <v-row class="p-0 m-0">
                    <v-col md="6" class="p-0">
                      <v-text-field
                      label="Nombre"
                      ></v-text-field>
                    </v-col>
                  </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col md="6">
            <v-card
            class="mb-2"
            >
              <v-card-title>
                <v-row>
                  <v-col md="8">
                    <v-text-field
                    placeholder="Ingrese número de control"
                    v-model="date" 
                    regular label="Número de control"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
       
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continuar
        </v-btn>

        <v-btn text
        @click="e1 = e1-1"
        >
          Regresar
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>
        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Guardar
        </v-btn>

        <v-btn text
        @click="e1 = e1-1"
        >
          Regresar
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    name:'Asginar',
    data () {
      return {
        e1: 1,
        date:null,
        matricula:null,
        items: [
          {id:1, name:'Deportivo'},
          {id:2, name:'Cultural'},
          {id:3, name:'Cívico'},
        ],
        headers: [
          { text: 'Nombre', value: 'name' },
          { text: 'Tipo de evento', value: 'type_event_id' },
          { text: 'Organizador', value: 'organizer' },
          { text: 'Lugar', value: 'place' },
          { text: 'Fecha', value: 'date' },
        ],
        headersAlumno: [
          { text: 'Número control', value: 'matricula' },
          { text: 'Nombre', value: 'name' },
          { text: 'Semestre', value: 'semestre' },
          { text: 'Carrera', value: 'carrera' },
        ],
      }
    },
    mounted () {
      this.getEvents();
      this.getAlumnos();
    },
    computed:{
       ...mapGetters({
      events: 'event/events',
      alumnos: 'alumno/alumnos',
    })
    },
    methods:{
      ...mapActions('event',['store','getEvents']),
      ...mapActions('alumno',['getAlumnos','find']),
      findAlumno(){
        this.find(this.matricula)
      }
    },
  }
</script>

<style>

</style>