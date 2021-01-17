<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Seleccionar evento
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
            <eventPicker v-model="form.event_id" />
          </v-card>

          <v-btn color="primary" @click="e1 = 2"> Continuar </v-btn>

          <v-btn text> Cancelar </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-2">
            <AlumnoSelect v-model="form.alumnos" :event_id="form.event_id" />
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
        event_id: 0,
        alumnos: [],
      },
    };
  },
  computed: {
    isAlumnosFilled: function () {
      let res = this.form.alumnos.length > 0;
      return res;
    },
  },
  methods: {
    ...mapActions("event", ["storeAttendance"]),
    async guardar() {
      let responseSwal = await alert.confirm(
        "Guardar datos",
        "¿Está seguro de guardar los datos?",
        "Si, guardar!",
        "No, cancelar!"
      );
      if (responseSwal) {
        let response = await this.storeAttendance(this.form);
        if (response) {
          alert.toast("Datos guardados correctamente", 5000);
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
</style>