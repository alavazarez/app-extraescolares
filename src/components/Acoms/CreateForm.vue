<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-small fab color="primary" dark v-bind="attrs" v-on="on">
          <v-icon dark>mdi-pencil</v-icon></v-btn
        >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Crear ACOM 4</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field type="date" value="as" label="Fecha"></v-text-field>
            </v-col>
            <v-col cols="6"> 
              <v-text-field label="Usuario" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Descripción"
                counter
                maxlength="120"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterForm",
  data: () => ({dialog:false})
};
</script>
