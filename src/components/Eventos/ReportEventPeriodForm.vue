<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="primary" rounded v-bind="attrs" v-on="on">
        <v-icon dark>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Eventos extraescolares realizados en un periodo
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
          <v-row align="center" justify="space-around">
            <v-col cols="8">
              <v-text-field
              :rules="dateInicialRules"
              v-model="date.initialDate"
              type="date"
              label="Fecha inicial"
             ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col cols="8">
              <v-text-field
              :rules="dateFinalRules"
              v-model="date.finalDate"
              type="date"
              label="Fecha Final"
             ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
              <div class="my-2">
                <v-btn
                  :disabled="!valid"
                  text @click="exportar"
                  color="success"
                  fab
                  x-large
                  dark>
                  <v-icon>mdi-file-excel</v-icon>
                </v-btn>
              </div>
          </v-row>
          <v-row align="center" justify="space-around">
          <v-card-title>Generar Excel</v-card-title>
          </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "ReportEventPeriodForm",
  data: () => ({
    valid: true,
    dialog:false,
    dateInicialRules: [
        v => !!v || 'La fecha inicial del periodo es requerido',
      ],
      dateFinalRules: [
        v => !!v || 'La fecha final del periodo es requerido',
      ],
    date:{
      initialDate:null,
      finalDate:null
    }
    }),

    methods:{
      ...mapActions('event',['exportarPeriodEvents']),
      async exportar(){
        if(this.$refs.form.validate() == true)
        {
        try {
          await this.exportarPeriodEvents(this.date)
        } catch (error) {
        }
        }
      },
    }
};
</script>
