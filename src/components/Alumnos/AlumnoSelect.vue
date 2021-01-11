<template>
  <v-row>
    <v-col md="8">
      <v-card class="mb-2">
        <v-card-title class="m-0">
          <v-row>
            <v-col md="6">
              <v-text-field
                placeholder="Ingrese número de control"
                v-model="matricula"
                regular
                label="Número de control"
              ></v-text-field>
            </v-col>
            <v-col sm="12" md="6" class="mt-4">
              <v-btn  @click="findAlumno"> Buscar </v-btn>
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
            <v-col md="4" class="d-flex justify-center">
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
      <v-card class="mb-2" min-height="315px">
        <v-list class="overflow-y-auto" max-height="300">
          <v-subheader>SELECCIONADOS</v-subheader>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in inputValue" :key="i">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.matricula }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AlumnoSelect",
  props:{
    value:{
      type:Array,
      required:true,
    }
  },
  data() {
    return {
      selectedAlumnos:[],
      matricula:undefined,
      hidden:true,
    };
  },
  computed: {
    ...mapGetters({
      alumno: "alumno/alumno",
    }),
    inputValue:{
      get(){
        return this.value;
      },
      set(val){
        return this.$emit('input',val)
      }
    },
  },
  methods: {
    ...mapActions('alumno',['getAlumnos','find']),
    async findAlumno() {
      try {
        let res = await this.find(this.matricula);
        if (res) this.hidden = false;
      } catch (error) {
        console.log(error, "error de vue");
      }
    },
    addAlumnoToList(){
      this.inputValue.push(this.alumno);
      this.matricula = '';
      delete this.alumno.name;
      delete this.alumno.semestre;
      delete this.alumno.carrera;
      this.hidden=true;
    },
  },
};
</script>

<style>
</style>