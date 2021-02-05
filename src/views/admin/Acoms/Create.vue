<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        Crear ACOM
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-text-field
                label="Numero de control*"
                required
                type="number"
                v-model="matricula"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn @click="findAlumno" depressed color="primary"
                >Buscar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-container>
        <v-row align="center" justify="space-around">
          <v-col cols="4">
            <v-text-field
              label="Alumno"
              outlined
              readonly
              v-model="data.nameComplet"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="Semestre"
              outlined
              readonly
              v-model="alumno.semestre"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Carrera"
              outlined
              readonly
              v-model="alumno.carrera"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-col cols="10">
            <v-textarea
              outlined
              label="Descripción"
              counter
              maxlength="120"
              v-model="value.description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-row align="center" justify="space-around">
        <v-col cols="2">
          <v-btn
            depressed
            x-large
            color="primary"
            :disabled="bloquear"
            @click="crearAcom"
            >Crear
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "Create",
  mounted() {
    this.cleanInputs();
  },
  data() {
    return {
        idAlumno : null,
        matricula:null,
        data: {nameComplet:''},
        value: {
          no_de_control:this.matricula,
          typeAcom_id:2,
          dateDelivery:'',
          description: '',
          status:0,
        }
    }
  },
  computed: {
    ...mapGetters({
      alumno: "alumno/alumno",
    }),

    bloquear() {
      return this.value.description.trim() === "" ? true : false;
    },
  },
  methods: {
    ...mapActions("alumno", ["find"]),
    ...mapActions("acom", ["crear"]),
    async findAlumno() {
      try {
        let res = await this.find(this.matricula);
        if (res == false) {
            Swal.fire({
            icon: "error",
            title: "¡El alumno no existe!",
            text: "Numero de control incorrecto",
          });
          this.cleanInputs()
        } else {
          this.data.nameComplet = this.alumno.nombre+" "+this.alumno.apellidos
        }
      } catch (error) {
        alert(error, "error de vue");
      }
    },
    async crearAcom() {
      try {
        this.value.no_de_control=this.alumno.no_de_control
        if(this.value.no_de_control == null)
        {
          Swal.fire({
          icon: 'error',
          title: 'No se ha buscado al alumno',
          showConfirmButton: false,
          timer: 2500
          })
        }
        else{
        let res = await this.crear(this.value);
        if (res.data == true) {
          Swal.fire({
            icon: "success",
            title: "ACOM creado",
            text: "El ACOM de este alumno se ha creado",
            showConfirmButton: false,
            timer: 2500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El ACOM de este alumno ya se encuentra generado",
          });
        }
        }
      } catch (error) {}
      this.cleanInputs();
    },
    cleanInputs() {
      this.value.description = "";
      this.matricula = "";
      this.data.nameComplet = "";
      this.alumno.carrera = "";
      this.alumno.semestre = "";
      this.alumno.no_de_control = null
    },
  },
};
</script>

