<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="primary" rounded v-bind="attrs" v-on="on">
        <v-icon dark>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">ACOM´s por entregar a los estudiantes
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="space-around">
              <div class="my-2">
                <v-btn
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "ReportToDeliverForm",
  data: () => ({
    dialog:false
    }),

  methods:{
      ...mapActions('acom',['exportarAcomsPendientes']),
      async exportar(){
        try {
          await this.exportarAcomsPendientes()
        } catch (error) {
        }
      },
    }
};
</script>
