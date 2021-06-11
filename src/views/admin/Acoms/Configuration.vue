<template>
  <v-container>
    <v-card>
      <v-card-title class="heading-2">
        CONFIGURACION
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row align="center" justify="space-around">
            <v-col cols="12" sm="6" md="6">
              <v-text-field
              :rules="nameJefeRules"
                label="Nombre del jefe del Departamento de Actividades Extraescolares"
                outlined
                v-bind:disabled="BotonDesabilitado"
                v-model="acom.nameBossDAE"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col cols="12" sm="6" md="6">
              <v-text-field
              :rules="nameCoordiRules"
                label="Nombre del Profesor Responsable y/o Coordinador"
                outlined
                v-bind:disabled="BotonDesabilitado"
                v-model="acom.nameCoordinator"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :rules="nameJefeEscoRules"
                label="Nombre del jefe del Departamento de Servicios Escolares"
                outlined
                v-bind:disabled="BotonDesabilitado"
                v-model="acom.nameBossDSE"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :rules="muletillaRules"
                label="Frase o muletilla"
                outlined
                v-bind:disabled="BotonDesabilitado"
                v-model="acom.slogan"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="2">
              <v-btn
                depressed
                color="primary"
                @click="Editar()"
                v-bind:disabled="BotonDesabilitadoEditar"
                >Editar
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                depressed
                :disabled="!valid"
                color="success"
                @click="submit"
                >Actualizar
              </v-btn>
              <v-overlay v-model="overlay">
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
            </v-col>
          </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  mounted() {
    this.getAcomData()
    this.valid=false
  },
  data: () => ({
    valid:false,
    BotonDesabilitadoEditar: null,
    BotonDesabilitado: true,
    nameJefeRules: [
        v => !!v || 'Nombre del jefe es requerido',
      ],
    nameCoordiRules: [
        v => !!v || 'Nombre del coordinador es requerido',
      ],
    nameJefeEscoRules: [
        v => !!v || 'Nombre del jefe es requerido',
      ],
    muletillaRules: [
        v => !!v || 'La muletilla es requerido',
      ],
  }),
  computed: {
    ...mapGetters({
      overlay: "acom/overlay",
      acom: "acom/acom",
    }),
  },
  methods: {
    ...mapActions("acom", ["getAcomData", "updateacom"]),

    async submit() {
      
      this.BotonDesabilitado = true;
      try {
        await this.updateacom(this.acom);
        Swal.fire({
            icon: "success",
            title: "Datos actualizados",
            text: "La informacion se ha guardado correctamente",
            showConfirmButton: false,
            timer: 2500
          });
        this.BotonDesabilitadoEditar = false;
        this.valid=false
      } catch (error) {}
    },

    Editar() {
      this.valid=true
      this.BotonDesabilitadoEditar = true;
      this.BotonDesabilitado = false;
    },
  },
};
</script>
