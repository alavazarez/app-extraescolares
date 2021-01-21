<template>
  <v-row class="d-flex justify-center">
    <v-col md="6">
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
            <v-col sm="2" md="4" class="mt-4">
              <v-btn @click="findAlumno"> Buscar </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <div class="ml-4">
          <v-row>
            <v-col md="5">
              <v-text-field
                readonly
                v-model="alumno.nombre"
                label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col md="4">
              <v-text-field
                readonly
                v-model="alumno.apellidos"
                label="Apellidos"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="7">
              <v-text-field
                readonly
                v-model="alumno.carrera"
                label="Carrera"
              ></v-text-field>
            </v-col>
            <v-col md="2">
              <v-text-field
                readonly
                v-model="alumno.semestre"
                label="Semestre"
              ></v-text-field>
            </v-col>
            <v-col md="3" class="d-flex justify-center">
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
      <v-card class="mb-2" min-height="314px">
        <v-list class="overflow-y-auto" max-height="300">
          <v-subheader>SELECCIONADOS</v-subheader>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in inputValue" :key="i">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.no_de_control }}</v-list-item-title>
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
import Swal from "sweetalert2";
export default {
  name: "AlumnoSelect",
  mounted ()
  {
    this.clear()
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    event_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedAlumnos: [],
      matricula: undefined,
      hidden: true,
      data: {
        event_id: 0,
        no_de_control: 0,
      },
    };
  },
  computed: {
    ...mapGetters({
      alumno: "alumno/alumno",
    }),
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        return this.$emit("input", val);
      },
    },
  },
  methods: {
    ...mapActions("alumno", ["getAlumnos", "find", "validate"]),
    async findAlumno() {
      try {
        let res = await this.find(this.matricula);
        if (res) this.hidden = false;
        if (res == false) {
          this.matricula = ""
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El alumno no existe",
          });
        }
      } catch (error) {
        console.log(error, "error de vue");
      }
    },
    async addAlumnoToList() {
      this.data.event_id = this.event_id
      this.data.no_de_control = this.alumno.no_de_control
      let res = await this.validate(this.data);
      if(res.data == true)
      {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El alumno ya se encuentra registrado a este evento",
        });
        this.clear();
      }
      else
      {
        this.inputValue.push(this.alumno);
        this.data.idEvento = this.event_id;
        this.data.idAlumno = this.alumno.id;
        this.clear();
      }
    },
    clear(){
      this.matricula = "";
      delete this.alumno.nombre;
      delete this.alumno.apellidos;
      delete this.alumno.semestre;
      delete this.alumno.carrera;
      this.hidden = true;
    }
  },
};
</script>

<style>
</style>