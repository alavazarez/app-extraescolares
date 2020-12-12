<template>
  <v-card>
    <v-card-title class="heading-2">
      Crear ACOM
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
        <v-container>
          <v-row >
            <v-col cols="3">
              <v-text-field 
              label="Matricula*" 
              required
              v-model="matricula"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn
                @click="findAlumno"
                depressed
                color="primary"
                >Buscar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
        <v-row align="center" justify="space-around">
            <v-col cols="4">
            <v-text-field
              label="Alumno"
              outlined
              readonly
              v-model="alumno.name"
            ></v-text-field>
            </v-col><v-col cols="2">
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
        </v-row>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Delivers",
    mounted(){
      },
  data(){
    return {
        idAlumno : null,
        matricula:null,
        value: {
          alumno_id:this.idAlumno,
          typeAcom_id:1,
          dateDelivery: '',
          description: '',
          status:0,
        }
    }
  },
  computed:{
    ...mapGetters({
      alumno: 'alumno/alumno',
    }),

    bloquear(){
      return this.value.description.trim() === "" ? true : false
    }
  },
  methods:{
      ...mapActions('alumno',['find']),
      ...mapActions('acom',['crear']),
    async findAlumno(){
        try {
          let res = await this.find(this.matricula)
          if(res)
            this.hidden = false;
        } catch (error) {
            console.log(error,'error de vue')
        }
        this.value.alumno_id=this.alumno.id
      },
      async crearAcom(){
        try {
          await this.crear(this.value)
        } catch (error) {
        }
        this.cleanInputs();
      },
      cleanInputs(){
        this.value.description=''
        this.matricula=''
        this.alumno.name=''
        this.alumno.carrera=''
        this.alumno.semestre=''
      }
  }

}
</script>

