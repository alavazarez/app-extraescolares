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
          <v-col md="8">
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
                  <v-row>
                    <v-col md="6">
                      <v-text-field
                      readonly
                      v-model="alumno.name"
                      label="Nombre"
                      ></v-text-field>
                    </v-col>
                     <v-col md="2">
                      <v-text-field
                      readonly
                      v-model="alumno.semestre"
                      label="Semestre"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col md="8">
                      <v-text-field
                      readonly
                      v-model="alumno.carrera"
                      label="Carrera"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4"
                      class="d-flex justify-center"

                    >
                    <v-fab-transition>
                      <v-btn
                      v-show="!hidden"
                      @click="addAlumnoToList"
                      color="pink"
                      relative
                      dark
                      fab
                      >
                       <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-fab-transition>
                  </v-col>
                  </v-row>
                  
              </div>
            </v-card>
          </v-col>
          <v-col md="4">
            <v-card
            class="mb-2"
            min-height="315px"
            >
             <v-list class="overflow-y-auto" max-height="300">
               <v-subheader>SELECCIONADOS</v-subheader>
               <v-list-item-group>
                 <v-list-item
                  v-for="(item, i) in selectedAlumnos"
                  :key="i">
                   <v-list-item-icon>
                     <v-icon>mdi-account</v-icon>
                   </v-list-item-icon>
                   <v-list-item-content>
                    <v-list-item-title>{{item.matricula}}</v-list-item-title>
                  </v-list-item-content>
                 </v-list-item>
               </v-list-item-group>
             </v-list>
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
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    name:'Asginar',
    data () {
      return {
        hidden:true,
        e1: 1,
        date:null,
        matricula:null,
        selectedAlumnos:[],
        items: [
          {id:1, name:'Deportivo'},
          {id:2, name:'Cultural'},
          {id:3, name:'Cívico'},
        ],
        headers: [
          { text: 'Nombre', value: 'nameEvent' },
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
      alumno: 'alumno/alumno',
    })
    },
    methods:{
      ...mapActions('event',['store','getEvents']),
      ...mapActions('alumno',['getAlumnos','find']),
      async findAlumno(){
        try {
          let res = await this.find(this.matricula)
          if(res)
            this.hidden = false;
        } catch (error) {
            console.log(error,'error de vue')
        }
      },
      addAlumnoToList(){
        this.selectedAlumnos.push(this.alumno);
        this.matricula = '';
        delete this.alumno.name;
        delete this.alumno.semestre;
        delete this.alumno.carrera;
        this.hidden=true;
      },
    },
  }
</script>

<style>

</style>