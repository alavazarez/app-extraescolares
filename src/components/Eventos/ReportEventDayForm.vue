<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="primary" rounded v-bind="attrs" v-on="on">
        <v-icon dark>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Evento extraescolar realizado en un dia especifico
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="space-around">
            <v-col cols="8">
              <v-text-field type="date" value="as"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-select
                :items="items"
                label="Tipo"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col class="d-flex" cols="12" sm="8">
              <v-select
                :items="items"
                label="Lugar"
                solo
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center" justify="space-around">
              <div class="my-2">
                <v-btn
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
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ReportEventDayForm",
  data: () => ({
    items: ['Masculino', 'Femenino'],
    dialog:false
    })
};
</script>
