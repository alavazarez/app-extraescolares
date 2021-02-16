<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Seleccionar evento
          <transition name="slide-fade">
            <span v-if="showNombreEvento" class="blue--text">{{nombreDelEventoSeleccionado}}</span>
           </transition>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Seleccionar alumnos
        </v-stepper-step>

        <v-divider></v-divider>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-2">
            <eventPicker v-model="form.event" />
          </v-card>

          <v-btn color="primary" @click="continuar"> Continuar </v-btn>

          <v-btn text> Cancelar </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-2">
            <AlumnoSelect v-model="form.alumnos" :event_id="form.event.id" />
          </v-card>
          <v-btn v-if="isAlumnosFilled" color="primary" @click="guardar">
            Guardar
          </v-btn>
          <v-btn @click="e1 = 1" text> Regresar </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import eventPicker from "../../../components/Eventos/EventPicker";
import AlumnoSelect from "../../../components/Alumnos/AlumnoSelect";
import alert from "../../../util/alert";
import Swal from "sweetalert2";
import { mapActions } from "vuex";
export default {
  name: "Asignar",
  components: {
    eventPicker,
    AlumnoSelect,
  },
  data() {
    return {
      e1: 1,
      form: {
        event: {
          id:0,
          nameEvent:""
        },
        alumnos: [],
      },
      show: true
    };
  },
  computed: {
    isAlumnosFilled: function () {
      let res = this.form.alumnos.length > 0;
      return res;
    },
    nombreDelEventoSeleccionado(){
      return this.form.event.nameEvent;
    },
    showNombreEvento(){
      return this.form.event.id != 0;
    }
  },
  methods: {
    ...mapActions("event", ["storeAttendance"]),
    continuar(){
      if(this.form.event.id != 0 ){
        this.e1 = 2
      }
      else{
        alert.toast("Por favor, seleccione un evento", 1500, "error");
      }
    },
    async guardar() {
      let responseSwal = await alert.confirm(
        "Guardar datos",
        "¿Está seguro de guardar los datos?",
        "Si, guardar!",
        "No, cancelar!"
      );
      if (responseSwal) {
        let values = {
          event_id : this.form.event.id,
          alumnos : this.form.alumnos
        };
        let response = await this.storeAttendance(values);
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Asistencias generadas",
            text: "Se han guardado las asistencias correctamente",
            showConfirmButton: false,
            timer: 3000
          })
          this.form.alumnos = [];
          this.e1 = 1;
        } else {
          alert.toast("Error al guardar los datos", 5000, "error");
        }
      }
    },
  },
};
</script>

<style>
  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>