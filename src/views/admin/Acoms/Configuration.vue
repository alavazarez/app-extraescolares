<template>
  <v-card>
    <v-card-title class="heading-2">
      CONFIGURACION
      <v-spacer></v-spacer>
    </v-card-title>
   
    <v-card-text>
        <v-container>
          <v-row align="center" justify="space-around">
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
            <v-text-field
              label="Nombre del jefe del Departamento de Actividades Extraescolares"
              outlined
              readonly
              v-model="acoms.nameBossDAE"
            ></v-text-field>
        </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
            <v-text-field
              label="Nombre del Jefe de la oficina de promocion"
              outlined
              readonly
              v-model="acoms.nameCoordinator"
            ></v-text-field>
        </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
            <v-text-field
              label="Nombre del jefe del Departamento de Servicios Escolares"
              outlined
              readonly
              v-model="acoms.nameBossDSE"
            ></v-text-field>
        </v-col>
        </v-row>
        <v-row align="center" justify="space-around">
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
            <v-text-field
              label="Frase o muletilla"
              outlined
              readonly
              v-model="acoms.slogan"
            ></v-text-field>
        </v-col>
        </v-row>
          <!-- <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Cuerpo de la constancia"
                counter
                maxlength="120"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card-title class="heading-3">Logo Izquierdo</v-card-title>
              <v-file-input
                label="seleccionar archivo"
                filled
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="150"
              max-width="250"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
            </v-col>
            <v-col cols="6">
              <v-card-title class="heading-3">Logo Derecho</v-card-title>
              <v-file-input
                label="seleccionar archivo"
                filled
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="150"
              max-width="250"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
            </v-col>
          </v-row>-->
          <v-row align="center" justify="space-around">
            <v-col cols="6">
              <v-btn
                depressed
                color="primary"
                >Editar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                depressed
                color="primary"
                >Actualizar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Acom from '../../../api/Acom'

export default {
  
  mounted(){
    this.getAcomData();
    console.log(this.acoms.id);
  },
  data:()=>({
    
    
        }),
  computed:{
    ...mapGetters({
      acoms: 'acom/acoms',
    })
  },
  methods:{
    ...mapActions('acom',['getAcomData']),
  },
}
</script>
